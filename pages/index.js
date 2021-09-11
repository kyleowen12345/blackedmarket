import {  gql } from "@apollo/client";
import { initializeApollo } from "../src/apollo.ts";
import { useQuery } from "@apollo/client";
import ProductGrid from "../components/product/ProductGrid"
import StoreGrid from "../components/store/StoreGrid"
import { Box,Text  } from "@chakra-ui/react"
import Deals from "../components/Deals/Deals";
import CarouselBanner from "../components/Banner/CarouselBanner";
import Footer from "../components/Footer/Footer";
import { NextSeo } from "next-seo";


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
           <Text   fontSize={["13px","13px","17px"]} bg="white" mt={20} mb={5} p={[3,3,3,5]} fontWeight="bold" boxShadow="md" id="Store"   color="#FC8E00">Top Stores</Text>
             <StoreGrid stores={data?.landingpage.stores} imageLoad={"eager"}/>
           <Text  fontSize={["13px","13px","17px"]}  bg="white" mt={10} mb={5} p={[3,3,3,5]} fontWeight="bold" boxShadow="md" id="products"   color="#FC8E00">New Products</Text>
             <ProductGrid products={data?.landingpage.products} imageLoad={"eager"}/>
       </Box>


    <Footer/>


    <NextSeo
      title='BlackedMarket'
      canonical='https://blackedmarket.vercel.app/'
      description="Diversify your bonds and grow with BlackedMarket.."
      openGraph={{
         url:'https://blackedmarket.vercel.app/',
         title:'BlackedMarket',
         description:"Diversify your bonds with BlackedMarket..",
         images:[
           {
             url: 'https://res.cloudinary.com/kaking/image/upload/v1628750805/217357472_675551463359051_2404077277848383996_n_ljac7b.png',
             width: 200,
             height: 200,
             alt: 'Diversify your bonds with BlackedMarket..',
           }
               ]
      }}
      twitter={{
        site:'BlackedMarket',
        cardType:'summary_large_image',
        handle:'Kyle Owen Ga'
      }}>
    </NextSeo>
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