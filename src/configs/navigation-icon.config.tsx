import { BsFileEarmarkPostFill } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { HiOutlineCurrencyDollar, HiOutlineViewGridAdd } from 'react-icons/hi'
import { RxDashboard } from 'react-icons/rx'
import { BsAwardFill } from 'react-icons/bs'
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
  apps: <HiOutlineViewGridAdd />,
  crypto: <HiOutlineCurrencyDollar />,
  dashboard: <RxDashboard />,
  user: <FaUsers />,
  post: <BsFileEarmarkPostFill />,
  aution: <BsAwardFill />,
  transfer: <CurrencyExchangeRoundedIcon/>
}

export default navigationIcon
