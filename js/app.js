/* ===========================================
   Nice TRY ($NT)

   File: app.js
   Version: 1.0
=========================================== */


document.addEventListener(
    "DOMContentLoaded",
    initApp
);
let selectedPeriod = "h24";



/* ===========================================
   Initialize
=========================================== */

async function initApp(){


    await loadMarketData();


    updateToken();

    updateMarket();

    updateLinks();


    setupMarketPeriods();

    setupCopyContract();


}





/* ===========================================
   Token
=========================================== */


function updateToken(){


    if(!hasMarket())
        return;



    setText(
        "tokenName",
        getName()
    );



    setText(
        "tokenSymbol",
        "$" + getSymbol()
    );



    setText(
        "contractAddress",
        getTokenAddress()
    );


}







/* ===========================================
   Market
=========================================== */


function updateMarket(){


    if(!hasMarket())
        return;



    setText(
        "price",
        getPriceFormatted()
    );



    setMoney(
        "marketCap",
        getMarketCap()
    );



    setMoney(
        "liquidity",
        getLiquidity()
    );



    setMoney(
        "volume",
        getVolume(selectedPeriod)
    );



    const change =
        getPriceChange(selectedPeriod);



    setText(
        "priceChange",
        change.toFixed(2) + "%"
    );



    const changeElement =
        document.getElementById(
            "priceChange"
        );



    if(changeElement){


        changeElement.className =

            change >= 0

            ? "value green"

            : "value red";


    }




    setText(
        "dex",
        getDex()
    );


}

/* ===========================================
   Market Period Selector
=========================================== */


function setupMarketPeriods(){


    const buttons =
        document.querySelectorAll(
            ".periodButton"
        );


    buttons.forEach(button => {


        button.addEventListener(
            "click",
            ()=>{


                selectedPeriod =
                    button.dataset.period;


                buttons.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                updateMarket();


            }
        );


    });


}


/* ===========================================
   Links
=========================================== */


function updateLinks(){



    const buyButton =
        document.getElementById(
            "buyButton"
        );



    if(buyButton){

        buyButton.href =
            getDexscreenerUrl();

    }





    const dexButton =
        document.getElementById(
            "dexButton"
        );



    if(dexButton){

        dexButton.href =
            getDexscreenerUrl();

    }




    setLink(
        "xButton",
        CONFIG.X
    );



    setLink(
        "telegramButton",
        CONFIG.TELEGRAM
    );



}



/* ===========================================
   Copy Contract
=========================================== */


function setupCopyContract(){



    const button =
        document.getElementById(
            "copyContractButton"
        );



    if(!button)
        return;





    button.onclick = async ()=>{


        await navigator.clipboard.writeText(

            CONFIG.TOKEN

        );



        button.textContent =
            "Copied ✓";



        setTimeout(()=>{


            button.textContent =
                "Copy Contract";


        },2000);



    };



}








/* ===========================================
   Helpers
=========================================== */


function setText(
    id,
    value
){


    const element =
        document.getElementById(
            id
        );



    if(element){


        element.textContent =
            value || "--";


    }


}







function setMoney(
    id,
    value
){


    const element =
        document.getElementById(
            id
        );



    if(!element)
        return;



    element.textContent =

        "$" +

        Number(value)

        .toLocaleString(

            "en-US",

            {

                maximumFractionDigits:0

            }

        );


}







function setLink(
    id,
    url
){


    const element =
        document.getElementById(
            id
        );



    if(element){

        element.href =
            url;

    }


}