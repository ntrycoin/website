/* ===========================================
   Nice TRY ($NT)

   File: wallet.js
   Version: 2.1
=========================================== */


let projectData = null;



document.addEventListener(
    "DOMContentLoaded",
    initWallet
);





/* ===========================================
   Initialize
=========================================== */


async function initWallet(){


    await loadProjectData();


    updateWallet();



    const button =
        document.getElementById(
            "copyDeveloperWalletButton"
        );



    if(button){


        button.addEventListener(
            "click",
            copyDeveloperWallet
        );


    }


}





/* ===========================================
   Backend
=========================================== */


async function loadProjectData(){


    try{


        const response = await fetch(

            `${CONFIG.API_BASE}/api/v1/project?token=${CONFIG.TOKEN}&developer=${CONFIG.DEVELOPER_WALLET}`,

            {
                cache:"no-store"
            }

        );



        if(!response.ok){


            const message =
                await response.text();


            throw new Error(
                `Wallet API HTTP ${response.status}: ${message}`
            );


        }



        projectData =
            await response.json();



        console.log(
            "NT Commitment:",
            projectData
        );


        return true;


    }


    catch(error){


        projectData = null;


        console.error(
            "Wallet API Error:",
            error
        );


        return false;


    }


}





/* ===========================================
   Update
=========================================== */


function updateWallet(){


    if(!projectData?.success)
        return;



    if(!projectData?.developer)
        return;



    setWallet(

        projectData.developer.wallet

    );



    setHoldings(

        projectData.developer.tokenBalance

    );


}





/* ===========================================
   Wallet Display
=========================================== */


function setWallet(wallet){


    const element =
        document.getElementById(
            "developerWalletShort"
        );



    if(!element)
        return;



    if(!wallet){


        element.textContent =
            "--";


        return;


    }



    element.textContent =
        wallet;


}





/* ===========================================
   Holdings
=========================================== */


function setHoldings(value){


    const element =
        document.getElementById(
            "developerAllocation"
        );



    if(!element)
        return;



    if(
        value === undefined ||
        value === null
    ){


        element.textContent =
            "--";


        return;


    }



    const amount =
        Number(value);



    if(!Number.isFinite(amount)){


        element.textContent =
            "--";


        return;


    }



    element.textContent =

        amount

        .toLocaleString(

            "en-US",

            {
                maximumFractionDigits:6
            }

        )

        +

        " $NT";


}





/* ===========================================
   Copy Wallet
=========================================== */


async function copyDeveloperWallet(){


    try{


        const wallet =
            projectData?.developer?.wallet;



        if(!wallet)
            return;



        await navigator.clipboard.writeText(
            wallet
        );



        const button =
            document.getElementById(
                "copyDeveloperWalletButton"
            );



        if(!button)
            return;



        const oldText =
            button.textContent;



        button.textContent =
            "Copied ✓";



        setTimeout(()=>{


            button.textContent =
                oldText;


        },2000);


    }


    catch(error){


        console.error(
            "Copy Wallet Error:",
            error
        );


    }


}