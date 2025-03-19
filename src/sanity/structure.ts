import { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Yeh Ticketing category create karega
      S.listItem()
        .title("Ticketing / Flights")
        .child(
          S.list()
            .title("Manage Flights")
            .items([
              // Yeh sirf "flights" type ke documents ko orderable banayega
              orderableDocumentListDeskItem({
                S,
                type: "flights",
                title: "Ticketing/ Flights",
                context: S.context, // Required field
              }),
              // Yahan agar Ticketing ka koi aur data hai to wo bhi add kar sakti hain
            ])
        ),
      // Baki sab automatically yahan aajayega
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "flights"
      ),
    ]);
