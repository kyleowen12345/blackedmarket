import {  gql } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import { useQuery } from "@apollo/client";
import ProductGrid from "../components/product/ReusableProductComponent/ProductGrid"
import StoreGrid from "../components/store/ReusableStoreComponets/StoreGrid"
import { Box,Text,Button  } from "@chakra-ui/react"
import Deals from "../components/Deals/Deals";
import CarouselBanner from "../components/Banner/CarouselBanner";
import Footer from "../components/Footer/Footer";
import NextLink from 'next/link'
import Seo from "../components/helpers/Seo";


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
      createdAt
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
    sold
    }
    
  }
}
`;


export default function Home() {
  const { data } = useQuery( LANDINGPAGE );
 
  return (
    <>
       <Box width={["100%","100%","100%","100%","100%",1200]} mr="auto" ml="auto"   display="flex" flexDirection="column" justifyContent="center">

           <CarouselBanner/>
           <Deals deals={data?.landingpage.deals}/>


           
           <Text   fontSize={["13px","13px","17px"]} bg="white" mt={10} mb={2} p={[3,3,3,5]} fontWeight="bold" boxShadow="md" id="Store"   color="#FC8E00">Top Stores</Text>
             <StoreGrid stores={data?.landingpage.stores} />
             <NextLink href={'/stores/1?sortOrder=storeName'} passHref>
                 <Button width={["90%","90%","30%"]} mx="auto" mt={5} bg="white" borderRadius={2} boxShadow="md" _hover={{bg:"#FBFBFB"}} fontSize="14px" color="gray.500" as="a">
                    See More
                 </Button>
             </NextLink>
         
           

           <Text  fontSize={["13px","13px","17px"]}  bg="white" mt={10} mb={2} p={[3,3,3,5]} fontWeight="bold" boxShadow="md" id="products"   color="#FC8E00">New Products</Text>
             <ProductGrid products={data?.landingpage.products} />
             <NextLink href={'/products/1?sortOrder=productName'} passHref> 
                 <Button width={["90%","90%","30%"]} mx="auto" mt={5} bg="white" borderRadius={2} boxShadow="md" _hover={{bg:"#FBFBFB"}} fontSize="14px" color="gray.500" as="a">
                     See More 
                 </Button> 
            </NextLink> 

       </Box>


    <Footer/>

    <Seo 
    title={'BlackedMarket'}
    url={'https://blackedmarket.vercel.app/'}
    description={"Diversify your bonds and grow with BlackedMarket.."}
    />
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