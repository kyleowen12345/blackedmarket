import {  gql } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import { useQuery } from "@apollo/client";
import ProductGrid from "../components/product/ProductGrid"
import StoreGrid from "../components/store/StoreGrid"
import { Box,Text  } from "@chakra-ui/react"
import Deals from "../components/Deals/Deals";
import CarouselBanner from "../components/Banner/CarouselBanner";


const LANDINGPAGE = gql`
query {
  landingpage{
    stores{
      id
      storeName
      storeType
      sellerName{
        email
      }
      storeBackgroundImage
    }
  products{
     id
    storeName{
      id
      storeName
    }
    productName
    price
    image
  }
    deals{
       _id
    productName
    price
    image
    description
    }
    
  }
}
`;


export default function Home({initialApolloState}) {
  const { data,error } = useQuery( LANDINGPAGE );
 
  return (
    <>
    
    <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"  p={[3,2,0]}  display="flex" flexDirection="column" justifyContent="center">
    <CarouselBanner/>
    <Deals deals={data?.landingpage.deals}/>
    <Text  size="2xl" bg="white" mt={20} mb={2} p={3} fontWeight="bold" boxShadow="md" id="Store" >Top Stores</Text>
    <StoreGrid stores={data?.landingpage.stores} imageLoad={"eager"}/>
   <Text  size="2xl" bg="white" mt={10} mb={2} p={3} fontWeight="bold" boxShadow="md" id="products">New Products</Text>
   <ProductGrid products={data?.landingpage.products} imageLoad={"eager"}/>
    </Box>
   
   </>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query:LANDINGPAGE,
  });
  const initialApolloState=apolloClient.cache.extract()
  return { props: {initialApolloState },revalidate:1 };
}