import React, { useRef, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import BannerLink from "./BannerLink"




// const arr = [
//   { show: "block", url: "https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg" },
//   { show: "none", url: "https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg" },
//   { show: "none", url: "https://image.freepik.com/free-vector/e-commerce-colorful-concept_1284-48408.jpg" },
//   { show: "none", url: "https://image.freepik.com/free-vector/online-shopping-mobile-shopping-internet-store-shop-website-smartphone-illustrations-set-customers-ordering-purchasing-goods-cartoon-characters-e-commerce-digital-technology_229548-29.jpg" },
// ];

const CarouselBanner = () => {
  // const [value, setValue] = React.useState(1);
  // const [delay, setDelay] = React.useState(5000);
  
  // useInterval(() => {
  //   // Your custom logic here
  //   value === 3 ? setValue(1) : setValue(value +1);
  //   arr.map(i => {
  //     return (i.show = "none");
  //   });
  //   arr[value].show = "block";
  // }, delay);
  return (
    <>
      <Box mt={[0,0,1,5]}backgroundColor="#222" display="flex">
        {/* {arr.map((item, key) => {
          return (
            <Box
              display="block"
              height={["150px","150px","200px","300px"]}
              width={["100%","100%","100%","100%","800px"]}
            >
              <Image src={"https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg"} alt={"wutang"}  height={"100%"} width="100%" loading="eager"/>
            </Box>
          );
        })} */}
         <Box
              display="block"
              height={["150px","150px","200px","300px"]}
              width={["100%","100%","100%","100%","800px"]}
            >
              <Image src={"https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg"} alt={"wutang"}  height={"100%"} width="100%" loading="eager"/>
            </Box>
        <Image src={"https://media.giphy.com/media/S5iaflEE71xTQaWTFm/giphy.gif"}  alt={"https://media.giphy.com/media/S5iaflEE71xTQaWTFm/giphy.gif"} height={"300px"}pl={10} display={["none","none","none","none","block"]} loading="eager"/>
      </Box>
      <BannerLink/>
    </>
  );
}
// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest function.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

export default CarouselBanner
