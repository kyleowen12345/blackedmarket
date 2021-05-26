import React from 'react'
const StoreForm = ({register,loading,error,errors}) => {
    return (
        <>
          <label htmlFor="storeName">storeName</label>
          <input {...register("storeName")} />
          <br/>
          <label htmlFor="storeAddress">storeAddress</label>
          <input {...register("storeAddress")} />
          <br/>
          <label htmlFor="storeDescription">storeDescription</label>
          <input {...register("storeDescription")} />
          <br/>
          <label htmlFor="storeType">storeType</label>
          <input {...register("storeType")} />
          <br/>
          <label htmlFor="socialMediaAcc">socialMediaAcc</label>
          <input {...register("socialMediaAcc")} />
          <br/>
          <label htmlFor="contactNumber">contactNumber</label>
          <input type="number" {...register("contactNumber")} />
          <br/>
          { error && <p>{error?.message}</p> }
     {loading ? <p className="p-2 text-white font-mono">Loading...</p>:<button type="submit" >Next</button>}
        </>
    )
}

export default StoreForm
