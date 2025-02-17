'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Hotels from '../hotelUi/page';
import UmrahPage from '../umrahPage/page';


export default function UmrahPackage() {
  return (
  <div>
  <UmrahPage/>

  
     <Hotels/>

  
    </div>
  );
}
