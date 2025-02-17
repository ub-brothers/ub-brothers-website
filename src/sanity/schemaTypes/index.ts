import { type SchemaTypeDefinition } from 'sanity'
import destination from './destination'
import stickerVisa from './stickerVisa'
import tour from './tour'


import umrahDays from './umrahDays'
import makkahHotel from './makkahHotel'
import madinaHotel from './madinaHotel'
import {  hajjDays} from './hajjForm'
import fileConsultancy from './fileConsultancy'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [destination, stickerVisa, tour,   umrahDays, makkahHotel, madinaHotel,  hajjDays, fileConsultancy],
}
  