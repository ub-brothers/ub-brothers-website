import { type SchemaTypeDefinition } from 'sanity'
import destination from './destination'
import stickerVisa from './stickerVisa'
import tour from './tour'


import umrahDays from './umrahDays'
import makkahHotel from './makkahHotel'
import madinaHotel from './madinaHotel'
import fileConsultancy from './fileConsultancy'
import iran from './iran'
import hajj from './hajj'
import ticketing from './ticketing'
import offer from './offer'
import umrahOffer from './umrahOffer'
import hajjOffer from './hajjOffer'
import iranOffer from './iranOffer'
import user from './user'
import booking from './booking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [user,booking,destination, stickerVisa, tour,   umrahDays, makkahHotel, madinaHotel , fileConsultancy, iran, hajj, ticketing, offer, umrahOffer,hajjOffer, iranOffer ],
}
  