export async function GET(req: Request) {
  try {
      const { searchParams } = new URL(req.url);
      const apiKey = process.env.AMADEUS_API_KEY; // Use environment variable
      const apiSecret = process.env.AMADEUS_API_SECRET;

      if (!apiKey || !apiSecret) {
          return new Response(JSON.stringify({ error: "API key is missing" }), { status: 500 });
      }

      // ✅ Get search parameters
      const origin = searchParams.get("origin");
      const destination = searchParams.get("destination");
      const departureDate = searchParams.get("departureDate");
      const returnDate = searchParams.get("returnDate");
      const adults = searchParams.get("adults") || "1";
      const children = searchParams.get("children") || "0";
      const infants = searchParams.get("infants") || "0";
      const cabinClass = searchParams.get("cabinClass")?.toUpperCase() || "ECONOMY";

      // ✅ Validate required fields
      if (!origin || !destination || !departureDate) {
          return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
      }

      // ✅ Ensure adults are at least 1
      if (parseInt(adults) < 1) {
          return new Response(JSON.stringify({ error: "Adults must be at least 1" }), { status: 400 });
      }

      // ✅ Validate Cabin Class
      const validCabinClasses = ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"];
      if (!validCabinClasses.includes(cabinClass)) {
          return new Response(JSON.stringify({ error: "Invalid cabin class" }), { status: 400 });
      }

      // ✅ Step 1: Get Auth Token from Amadeus API
      const authResponse = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: apiKey,
              client_secret: apiSecret,
          }),
      });

      const authData = await authResponse.json();
      if (!authResponse.ok || !authData.access_token) {
          console.error("❌ Auth Error:", authData);
          return new Response(JSON.stringify({ error: "Failed to get access token", details: authData }), { status: 500 });
      }

      const token = authData.access_token;
      console.log("🔑 Access Token:", token);

      // ✅ Step 2: Call Flight Search API
      let amadeusUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${cabinClass}&currencyCode=USD&max=5`;

      // ❌ Remove returnDate if it's empty
      if (returnDate && returnDate.trim() !== "") {
          amadeusUrl += `&returnDate=${returnDate}`;
      }

      console.log("🌍 Amadeus API URL:", amadeusUrl);

      const flightResponse = await fetch(amadeusUrl, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
          },
      });

      const flightData = await flightResponse.json();
      console.log("✈️ Flight API Response Data:", JSON.stringify(flightData, null, 2)); // ✅ See full response

      if (!flightResponse.ok) {
          console.error("❌ Flight API Error:", flightData);
          return new Response(JSON.stringify({ error: "Failed to fetch flights", details: flightData }), { status: 500 });
      }

      return new Response(JSON.stringify(flightData), { status: 200 });
  } catch (error) {
      console.error("❌ Server Error:", error);
      return new Response(JSON.stringify({ error: "Internal Server Error", details: error }), { status: 500 });
  }
}
