/* ===========================================
   NT Website
   File: api.js
   Version: 4.0
=========================================== */


const API = {

    BASE_URL:
        "https://api.dexscreener.com/token-pairs/v1"

};


let market = null;

let lastUpdate = null;




/* ===========================================
   Load Market Data
=========================================== */

async function loadMarketData(){


    try{


        const response = await fetch(

            `${API.BASE_URL}/${CONFIG.NETWORK}/${CONFIG.TOKEN}`,

            {
                cache:"no-store"
            }

        );



        if(!response.ok){

            throw new Error(
                `HTTP ${response.status}`
            );

        }



        const data =
            await response.json();



        if(!Array.isArray(data) || data.length === 0){


            throw new Error(
                "No trading pair found."
            );


        }



        market =
            data[0];



        lastUpdate =
            new Date();



        return true;



    }


    catch(error){


        console.error(
            "DexScreener Error:",
            error
        );


        return false;


    }


}





/* ===========================================
   General
=========================================== */


function hasMarket(){

    return market !== null;

}



function getMarket(){

    return market;

}



function getLastUpdate(){

    return lastUpdate;

}





/* ===========================================
   Token
=========================================== */


function getToken(){

    return market?.baseToken ?? {};

}



function getName(){

    return market?.baseToken?.name ?? "";

}



function getSymbol(){

    return market?.baseToken?.symbol ?? "";

}



function getTokenAddress(){

    return (
        market?.baseToken?.address
        ??
        CONFIG.TOKEN
    );

}





/* ===========================================
   Price
=========================================== */


function getPrice(){

    return Number(
        market?.priceUsd ?? 0
    );

}



function getPriceFormatted(){

    return "$" +
        getPrice()
        .toFixed(
            CONFIG.PRICE_DECIMALS
        );

}



function getPriceChange(period = "h24"){

    return Number(
        market?.priceChange?.[period] ?? 0
    );

}





/* ===========================================
   Market
=========================================== */


function getMarketCap(){

    return Number(
        market?.marketCap ?? 0
    );

}



function getFDV(){

    return Number(
        market?.fdv ?? 0
    );

}



function getLiquidity(){

    return Number(
        market?.liquidity?.usd ?? 0
    );

}



function getVolume(period = "h24"){

    return Number(
        market?.volume?.[period] ?? 0
    );

}





/* ===========================================
   Pair
=========================================== */


function getDex(){

    return market?.dexId ?? "";

}



function getChain(){

    return market?.chainId ?? "";

}



function getPairAddress(){

    return market?.pairAddress ?? "";

}



function getPairCreated(){

    return market?.pairCreatedAt ?? 0;

}





/* ===========================================
   DexScreener URL
=========================================== */


function getDexscreenerUrl(){


    return (

        CONFIG.DEXSCREENER_BASE +
        CONFIG.TOKEN

    );


}





function getChartUrl(){


    return getDexscreenerUrl();


}





/* ===========================================
   Debug
=========================================== */


function printMarket(){


    console.table({

        Name:
            getName(),

        Symbol:
            getSymbol(),

        Token:
            getTokenAddress(),

        Price:
            getPrice(),

        MarketCap:
            getMarketCap(),

        FDV:
            getFDV(),

        Liquidity:
            getLiquidity(),

        Volume24h:
            getVolume("h24"),

        Change24h:
            getPriceChange("h24"),

        Dex:
            getDex()

    });


}