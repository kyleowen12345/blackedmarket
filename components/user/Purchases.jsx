import React from 'react'
import { Box} from "@chakra-ui/react"
import Pagination from '../helpers/Pagination'
import PurchasesSearch from './UserPurchases/PurchasesSearch';
import PurchaseList from './UserPurchases/PurchaseList';
const Purchases = ({history}) => {

    return (
        <Box width="80%" >
          <PurchasesSearch/>
              <PurchaseList history={history?.history}/>
            <Pagination marginPages={1} pageRange={2} initialPage={history?.curPage - 1} pageCount={history?.maxPage}/>
            </Box>
    )
}

export default Purchases
