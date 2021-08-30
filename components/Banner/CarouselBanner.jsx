import React, { useRef, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";
import BannerLink from "./BannerLink"




const arr = [
  { show: "block", url: "https://st2.depositphotos.com/1768806/8158/v/950/depositphotos_81582340-stock-illustration-e-comerce-doodle-concept.jpg" },
  { show: "none", url: "https://st2.depositphotos.com/1768806/8158/v/950/depositphotos_81582340-stock-illustration-e-comerce-doodle-concept.jpg" },
  { show: "none", url: "https://st2.depositphotos.com/1768806/10233/v/950/depositphotos_102339956-stock-illustration-viral-marketing-doodle-concept.jpg" },
  { show: "none", url: "https://st2.depositphotos.com/1768806/10056/v/950/depositphotos_100569436-stock-illustration-mobile-payments-doodle-concept.jpg" },
];

const CarouselBanner = () => {
  const [value, setValue] = React.useState(1);
  const [delay, setDelay] = React.useState(5000);
  
  useInterval(() => {
    // Your custom logic here
    value === 3 ? setValue(1) : setValue(value +1);
    arr.map(i => {
      return (i.show = "none");
    });
    arr[value].show = "block";
  }, delay);
  return (
    <>
      <Box mt={[0,0,0,0,0,5]}backgroundColor="#222" display="flex"  borderRadius="sm">
        {arr.map((item, key) => {
          return (
            <Box
              display={item.show}
              key={key}
              height={["150px","200px","300px","400px"]}
              width={["100%","100%","100%","100%","700px"]}
            >
              <Image src={item.url} alt={item.url}  height={"100%"} width="100%" loading="eager"/>
            </Box>
          );
        })}
        <Image src={"https://media.giphy.com/media/S5iaflEE71xTQaWTFm/giphy.gif"}  alt={"https://media.giphy.com/media/S5iaflEE71xTQaWTFm/giphy.gif"} height={["150px","200px","300px","400px"]} pl={10} display={["none","none","none","none","block"]} loading="eager"/>
      </Box>
      <BannerLink/>
    </>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default CarouselBanner
