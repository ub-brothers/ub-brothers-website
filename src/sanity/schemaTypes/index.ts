import { type SchemaTypeDefinition } from 'sanity'
import destination from './destination'
import stickerVisa from './stickerVisa'
import tour from './tour'
import hajjVisa from './umrah'

import umrahDays from './umrahDays'
import roomCategories from './roomCategories'
import makkahHotel from './makkahHotel'
import madinaHotel from './madinaHotel'
import hajj from './hajj'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destination, stickerVisa, tour, hajjVisa,  umrahDays,roomCategories, makkahHotel, madinaHotel, hajj],
}
