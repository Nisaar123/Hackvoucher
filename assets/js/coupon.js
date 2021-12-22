{
    console.log('********') ;
    let COUPON = () => {
        newCoupon = $('.card') ;

        newCoupon.submit((e) => {
            e.preventDefault() ;
        }) ;
    }
    COUPON() ;
}