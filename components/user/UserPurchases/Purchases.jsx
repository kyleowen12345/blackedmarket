import React from 'react'
import { Box} from "@chakra-ui/react"

import Pagination from '../../helpers/Pagination'
import PurchasesSearch from './PurchasesSearch';
import PurchaseList from './PurchaseList';

const Purchases = ({history}) => {

    return (
        <Box display="flex" flexDirection="column" width={["100%","100%","100%","100%","80%"]} px={[2,2,2,4,0]}>
              <PurchasesSearch/>
              <PurchaseList history={history?.history}/>
              {history?.maxPage > 1 &&<Pagination marginPages={1} pageRange={2} initialPage={history?.curPage - 1} pageCount={history?.maxPage}/>}
        </Box>
    )
}

export default Purchases
