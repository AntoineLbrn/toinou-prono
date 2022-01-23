import React, { FC } from 'react';
import { Image, Link } from '@chakra-ui/react';
import logo from '../../logo.png';

const HeaderLogo: FC = () => (
    <Link href="/"><Image marginX="auto" height="100%" src={logo}/></Link>
)

export default HeaderLogo;
