import React from 'react'
import { NextSeo } from 'next-seo';

const Seo = ({title,url,description,image}) => {
    return (
    <NextSeo
    // title
      title={title} 

    //   url
      canonical={url}

      // description
      description={description}

      openGraph={{
        //   url
        url:url,

        // title
        title:title,

        // description
        description:description,

        images:[
          {
            //   image
            url:image ? image:'https://image.freepik.com/free-vector/online-shop-illustration_180868-82.jpg',

            width: 200,
            height: 200,
            
            // title
            alt: title,
          }
              ]
      }}
      twitter={{
      site:'BlackedMarket',
      cardType:'summary_large_image',
      handle:'Kyle Owen Ga'
      }}>
     </NextSeo>
    )
}

export default Seo
