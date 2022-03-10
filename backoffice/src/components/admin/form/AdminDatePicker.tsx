import React, { FC } from 'react';
import { Box, BoxProps, chakra, forwardRef, HStack, propNames } from '@chakra-ui/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AdminDatePicker = chakra(DatePicker)

export default AdminDatePicker;
