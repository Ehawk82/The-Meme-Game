// For an introduction to the Blank template, see the following documentation:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    var isFirstActivation = true;

    var ViewManagement = Windows.UI.ViewManagement;
    var ApplicationViewWindowingMode = ViewManagement.ApplicationViewWindowingMode;
    var ApplicationView = ViewManagement.ApplicationView;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.voiceCommand) {
            // TODO: Handle relevant ActivationKinds. For example, if your app can be started by voice commands,
            // this is a good place to decide whether to populate an input field or choose a different initial view.
        }
        else if (args.detail.kind === activation.ActivationKind.launch) {
            // A Launch activation happens when the user launches your app via the tile
            // or invokes a toast notification by clicking or tapping on the body.
            if (args.detail.arguments) {
                // TODO: If the app supports toasts, use this value from the toast payload to determine where in the app
                // to take the user in response to them invoking a toast notification.
            }
            else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
                // TODO: This application had been suspended and was then terminated to reclaim memory.
                // To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
                // Note: You may want to record the time when the app was last suspended and only restore state if they've returned after a short period.
            }
        }

        if (!args.detail.prelaunchActivated) {
            // TODO: If prelaunchActivated were true, it would mean the app was prelaunched in the background as an optimization.
            // In that case it would be suspended shortly thereafter.
            // Any long-running operations (like expensive network or disk I/O) or changes to user state which occur at launch
            // should be done here (to avoid doing them in the prelaunch case).
            // Alternatively, this work can be done in a resume or visibilitychanged handler.
        }

        if (isFirstActivation) {
            // TODO: The app was activated and had not been running. Do general startup initialization here.
            document.addEventListener("visibilitychange", onVisibilityChanged);
            args.setPromise(WinJS.UI.processAll());
            ApplicationView.preferredLaunchWindowingMode = ApplicationViewWindowingMode.fullScreen;
        }

        isFirstActivation = false;
    };

    function onVisibilityChanged(args) {
        if (!document.hidden) {
            // TODO: The app just became visible. This may be a good time to refresh the view.
        }
    }

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
        // You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
        // If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
    };
    //main user interface
    var UI, AI, uData, tBool, dateTool, myData, moneyStuffs, myAu, pData;//app gloabals

    //project data
    pData = {
        monthstamp: 0,
        text_upper: "",
        text_lower: "",
        power: 0,
        invest: 0,
        p_Type: "000",
        p_Bool: false,
        t_level: 0
    }

    //tracking sound and music
    myAu = {
        main: 0.5,
        music: 0.5,
        amb: 0.5
    }

    //for measuring and tracking money data
    moneyStuffs = {
        mpt: 0,//money per tic
        lpt: 0,// i don't know'
        tmpt: 0,
        mpy: 0
    }

    //don't actuall know what i did here, but i need it
    myData = {
        mAu: 0,
        aAu: 0,
        sAu: 0
    }

    //for measuring and tracking date
    dateTool = {
        month: "",
        week: "",
        year: ""
    };

    tBool = 0;//Boolean for the timer ticker function

    //basic user data
    uData = {
        siteName: "",
        userName: "",
        money: 4,
        lvl: 9,
        gndr: "",
        hum: 4,
        int: 5,
        cre: 4,
        luck: 1,
        chr: 3,
        spd: 2,
        clvl: 1
    };

    //basic libraries

    var memes = ["ironyFrog", "grumpyCat", "wowDoge"];//image lookup
    var memesFormal = ["Irony Frog", "Grumpy Cat", "Wow Doge"];//User sees this
    var mnth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];//User sees this 

    //User Interface object
    UI = {
        //my basic return functions
        createEle: (x) => { return document.createElement(x) },
        bySelAll: (x) => { return document.querySelectorAll(x) },
        bySel: (x) => { return document.querySelector(x) },
        byTag: (x) => { return document.getElementsByTagName(x) },

        //initializing and startup
        init: () => {
            var Au = localStorage.getItem("myAu");
            if (!Au || Au === null) {
                localStorage.setItem("myAu", JSON.stringify(myAu));
            }
            //console.log("test");
            var mStuffs = localStorage.getItem("moneyStuffs");
            if (!mStuffs || mStuffs === null) {
                localStorage.setItem("moneyStuffs", JSON.stringify(moneyStuffs));
            }

            var dta = localStorage.getItem("myData");

            if (!dta || dta === null) {

                myData.mAu = 0;
                myData.aAu = 0;
                myData.sAu = 0;

                localStorage.setItem("myData", JSON.stringify(myData));
            }

            var pd = localStorage.getItem("pData");
            if (!pd || pd === null) {
                localStorage.setItem("pData", JSON.stringify(pData));
            }

            var ud = localStorage.getItem("uData");
            if (!ud || ud === null) {
                localStorage.setItem("uData", JSON.stringify(uData));
            }

            var dt = localStorage.getItem("dateTool");
            if (!dt || dt === null) {
                var d = new Date();
                var y = d.getFullYear(),
                    m = d.getMonth();

                dateTool.month = m;
                dateTool.week = 1;
                dateTool.year = y;

                localStorage.setItem("dateTool", JSON.stringify(dateTool));
            }

            localStorage.setItem("tBool", 0);

            UI.myLoad();
        },
        myLoad: () => {
            var myFrame = UI.createEle("div"),
                startBtn = UI.createEle("button"),
                contBtn = UI.createEle("button"),
                delBtn = UI.createEle("button");

            var pD = localStorage.getItem("pData");
            if (pD) {
                var ppp = JSON.parse(pD);
            }

            var uD = localStorage.getItem("uData");
            if (uD) {
                var uuu = JSON.parse(uD);
            }

            delBtn.innerHTML = "Delete All Storage";
            delBtn.className = "startPageBtn";
            delBtn.onclick = UI.deleteAllStorage;

            if (uuu.siteName != "") {
                contBtn.innerHTML = "Continue";
                contBtn.className = "startPageBtn";
                contBtn.onclick = UI.contProgram(myFrame, startBtn, delBtn, contBtn);
                myFrame.appendChild(contBtn);
            }
            if (uuu.siteName != "") {
                startBtn.innerHTML = "Start New";
                startBtn.className = "startPageBtn";
                startBtn.onclick = UI.startWarn(myFrame, startBtn, delBtn, contBtn);
            } else {
                startBtn.innerHTML = "Start New";
                startBtn.className = "startPageBtn";
                startBtn.onclick = UI.startProgram(myFrame, startBtn, delBtn, contBtn);
            }

            myFrame.className = "myFrame";

            myFrame.appendChild(startBtn);

            myFrame.appendChild(delBtn);

            dvContain.appendChild(myFrame);
        },
        startWarn: (myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                UI.mainClick();
                var warnPage = UI.createEle("div"), elems;
                startBtn.onclick = null;
                elems = "<h2>Warning!</h2>";
                elems += "<h4><strong><i>Would you like to overwrite?</i></strong></h4>";
                elems += "<p><button id='newGameBTN_yes'>YES</button> &nbsp; <button id='newGameBTN_no'>NO</button></p>";

                warnPage.innerHTML = elems;
                warnPage.className = "warnPage";


                myFrame.appendChild(warnPage);

                setTimeout(() => {
                    warnPage.className = "warnPage_full";
                    var newGameBTN_no = UI.bySel("#newGameBTN_no");
                    newGameBTN_no.onclick = UI.closeWarnPage(warnPage, myFrame, startBtn, delBtn, contBtn);

                    var newGameBTN_yes = UI.bySel("#newGameBTN_yes");
                    newGameBTN_yes.onclick = UI.closeAndStart(myFrame, startBtn, delBtn, contBtn);
                }, 100);
            }
        },
        closeAndStart: (myFrame, startBtn, delBtn, contBtn) => {
            return UI.startProgram(myFrame, startBtn, delBtn, contBtn);
        },
        closeWarnPage: (warnPage, myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                warnPage.className = "warnPage";

                UI.mainClick();
                setTimeout(() => {
                    warnPage.remove();
                    startBtn.onclick = UI.startWarn(myFrame, startBtn, delBtn, contBtn);
                }, 1000);
            }
        },
        contProgram: (myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                UI.mainClick();

                startBtn.remove();
                contBtn.remove();
                delBtn.remove();

                var ud = localStorage.getItem("uData");
                //console.log(ud);

                UI.proceedGame();
            }
        },
        startProgram: (myFrame, startBtn, delBtn, contBtn) => {
            return () => {
                var playerSetupPage = UI.createEle("div"), elems,
                    warnPage = UI.bySel(".warnPage_full");
                UI.mainClick();
                if (warnPage) {
                    warnPage.className = "warnPage";
                }

                elems = "<span id='setupX' class='xBtns'>X</span>";
                elems += "<h2>Setup Your Company</h2>";
                elems += "<p><input type='text' id='inputSiteName' class='setupItems' maxlength='18' /><label for='inputSiteName' class='infoLabels'>Site Name</label></p>";
                elems += "<p><input type='text' id='inputUserName' class='setupItems' maxlength='18' /><label for='inputUserName' class='infoLabels'>User Name</label></p>";
                elems += "<p><input id='rd1' type='radio' checked class='setupItems' name='rds' /><label for='rd1'>♂</label>";
                elems += "<input id='rd2' type='radio' unchecked class='setupItems' name='rds' /><label for='rd2'>♀</label>";
                elems += "<span id='genderSpn'>Male</span></p>";
                elems += "<p><div id='playerBox'>BOX</div></p>";
                elems += "<p><input type='button' value='⭕' class='setupConfirm' /></p>";

                playerSetupPage.className = "playerSetupPage";
                playerSetupPage.innerHTML = elems;

                startBtn.remove();
                delBtn.remove();
                if (contBtn) {
                    contBtn.remove();
                }
                myFrame.appendChild(playerSetupPage);

                setTimeout(() => {
                    playerSetupPage.className = "playerSetupPage_full";
                    var setupItems = UI.bySelAll(".setupItems");
                    var setupConfirm = UI.bySel(".setupConfirm");
                    var genderSpn = UI.bySel("#genderSpn");
                    var setupX = UI.bySel("#setupX");

                    setupX.onclick = UI.goHome(playerSetupPage, myFrame);

                    for (var i = 0; i < setupItems.length; i++) {
                        setupItems[0].onclick = () => { return setupItems[0].select() };
                        setupItems[1].onclick = () => { return setupItems[1].select() };
                        setupItems[i].onkeyup = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[i].onblur = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[2].onclick = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                        setupItems[3].onclick = UI.checkSetupData(setupItems, i, setupConfirm, genderSpn);
                    }

                }, 50);
                if (warnPage) {
                    setTimeout(() => {

                        warnPage.remove();

                    }, 1000);
                }
            }
        },
        checkSetupData: (setupItems, i, setupConfirm, genderSpn) => {
            /*
        siteName
        userName
        money
        lvl
        gndr
        hum
        int
        cre
        luck
        chr
        spd

        weekstamp
        name
        power
        invest
        p_Type
        p_Bool
            */
            return () => {
                uData.siteName = setupItems[0].value;
                uData.userName = setupItems[1].value;
                uData.money = uData.money;
                uData.lvl = uData.lvl;

                if (setupItems[3].checked) {
                    genderSpn.innerHTML = "Female";
                    uData.gndr = genderSpn.innerHTML;
                } else {
                    genderSpn.innerHTML = "Male";
                    uData.gndr = genderSpn.innerHTML;
                }

                uData.hum = uData.hum;
                uData.int = uData.int;
                uData.cre = uData.cre;
                uData.luck = uData.luck;
                uData.chr = uData.chr;
                uData.spd = uData.spd;
                uData.clvl = uData.clvl;

                var d = new Date();
                var y = d.getFullYear(),
                    m = d.getMonth();

                dateTool.month = m;
                dateTool.week = 1;
                dateTool.year = y;

                localStorage.setItem("uData", JSON.stringify(uData));
                localStorage.setItem("pData", JSON.stringify(pData));
                localStorage.setItem("dateTool", JSON.stringify(dateTool));

                if (setupItems[0].value != "" && setupItems[1].value != "") {
                    setupConfirm.value = "✔";
                    setupConfirm.onclick = UI.proceedGame;
                } else {
                    setupConfirm.value = "⭕";
                }
            }
        },

        //game stuffs
        proceedGame: () => {
            var ud = localStorage.getItem("uData"),
                pd = localStorage.getItem("pData"),
                playerSetupPage = UI.bySel(".playerSetupPage_full"),
                moneyStuffs = localStorage.getItem("moneyStuffs");
            if (playerSetupPage) {
                var myFrame = playerSetupPage.parentNode;

                setTimeout(() => {
                    playerSetupPage.className = "playerSetupPage";
                    setTimeout(() => {
                        playerSetupPage.remove();
                        UI.beginGameSession(myFrame, ud, moneyStuffs, pd);
                    }, 1000);
                }, 50);
            } else {
                var myFrame = UI.bySel(".myFrame");
                UI.beginGameSession(myFrame, ud, moneyStuffs, pd);
            }
        },
        homeClimate: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var climate = UI.createEle("div"),
                elemFloor = UI.createEle("div");

            elemFloor.className = "elemFloor";
            elemFloor.innerHTML = "&nbsp;";
            elemFloor.style.backgroundImage = "url(../images/floors/f" + uuu.clvl + ".jpg)";

            climate.className = "climate";
            climate.style.backgroundImage = "url(../images/walls/d" + uuu.clvl + ".jpg)";
            climate.appendChild(elemFloor);

            myFrame.appendChild(climate);

            setTimeout(() => {
                climate.className = "climate_full";
            }, 700);
        },
        beginGameSession: (myFrame, ud, moneyStuffs, pd) => {
            /* 
              -loading the game ()'s from here.  Note: Some functions depend on scope.
              -Scope order determined here
            */
            UI.doTable(myFrame, ud);
            UI.doTimer(myFrame, ud);
            UI.doTimerControls(myFrame, ud);
            UI.doMoneyTab(myFrame, ud, moneyStuffs);
            UI.memesFunc(myFrame, ud);
            UI.homeClimate(myFrame, ud);
            UI.projBool(myFrame, ud, pd);
        },
        projBool: (myFrame, ud, pd) => {
            var projectPanel = UI.createEle("div"), elems;

            if (pd) {
                var ppp = JSON.parse(pd);
            }
            //console.log(ppp.p_Type);
            elems = "Current Meme <hr />";
            elems += "Time left: " + ppp.monthstamp + "<br/>";
            elems += "<div id='dvProjMeme' style='background-image:url(../images/memes/" + ppp.p_Type + ".jpg);'>";
            elems += "<span id='spn1Display'>" + ppp.text_upper + "</span>";
            elems += "<span id='spn2Display'>" + ppp.text_lower + "</span>";
            elems += "</div>";
            elems += "💲<span>" + ppp.power + "</span>/week<br/>";
            elems += "Reach <span>" + ppp.invest + "</span><br/>";
            elems += "Level <span>" + ppp.t_level + "</span><br/>";

            projectPanel.innerHTML = elems;
            projectPanel.className = "projectPanel";

            myFrame.appendChild(projectPanel);

            setTimeout(() => {
                if (ppp.p_Bool == false) {
                    projectPanel.className = "projectPanel";
                } else {
                    projectPanel.className = "projectPanel_full";
                }
                //console.log(ppp.p_Bool);
            }, 1400);
        },
        doMoneyTab: (myFrame, ud, moneyStuffs) => {
            var moneyTab = UI.createEle("div");
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            if (moneyStuffs) {
                var mStfs = JSON.parse(moneyStuffs);
            }

            moneyTab.className = "moneyTab";
            moneyTab.innerHTML = "💰 &nbsp; <span id='moneySlot'>" + uuu.money + "</span>";

            myFrame.appendChild(moneyTab);

            setTimeout(() => {
                moneyTab.className = "moneyTab_full";
                //console.log(mStfs.mpt);
            }, 600);
        },
        makeMoney: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp) => {
            return () => {
                UI.mainClick();
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div"), elems,
                    moneyStuffs = localStorage.getItem("moneyStuffs");

                if (moneyStuffs) {
                    var mnstf = JSON.parse(moneyStuffs);
                }

                elems = "<h2><span>💰 Financial Report</span><span id='xMeme'>X</span></h2>";
                elems += "<div id='dvHold'><span>💲 per week</span>&nbsp;<span>" + mnstf.mpt + "</span></div>";
                elems += "<div id='dvHold'><span>💲 per year</span>&nbsp;<span>" + mnstf.mpy + "</span></div>";

                page.className = "menuPages";
                page.innerHTML = elems;

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xMoneyFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp);

                }, 300);
            }
        },
        xMoneyFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                UI.mainClick();
                page.className = "menuPages";

                setTimeout(() => {
                    if (ppp.p_Bool != true) {
                        newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    } else {
                        newMeme.onclick = null;

                    }
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    page.remove();
                }, 1000);
            }
        },
        makeResearch: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp) => {
            return () => {
                UI.mainClick();
                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div");

                page.className = "menuPages";
                page.innerHTML = "<h2><span>🔬 Science and Research</span><span id='xMeme'>X</span></h2>";

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xResearchFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp);

                }, 300);
            }
        },
        xResearchFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                UI.mainClick();
                page.className = "menuPages";

                setTimeout(() => {
                    if (ppp.p_Bool != true) {
                        newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    } else {
                        newMeme.onclick = null;
                    }
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    page.remove();
                }, 1000);
            }
        },
        makeMemer: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings) => {
            return () => {
                UI.mainClick();
                var ud = localStorage.getItem("uData"),
                    pd = localStorage.getItem("pData");

                if (ud) {
                    var uuu = JSON.parse(ud);
                }

                if (pd) {
                    var ppp = JSON.parse(pd);
                }

                if (dta) {
                    var ddd = JSON.parse(dta);
                }

                var page = UI.createEle("div"), elems, opts;

                opts = ppp.t_level;

                elems = "<h2><span>💡 Create a New Project</span><span id='xMeme'>X</span></h2>";

                elems += "<p>&nbsp;</p>";

                elems += "<p>Upper Text &nbsp;<input class='cls' maxLength='" + uuu.int + "' type='text' /></p>";

                elems += "<p><select>";
                for (var i = 0; i < uuu.cre; i++) {
                    elems += "<option class='opts'value='" + memes[i] + "' >" + memesFormal[i] + "</option>";
                }
                elems += "</select></p>";

                elems += "<p>Lower Text &nbsp;<input class='cls' maxLength='" + uuu.int + "' type='text' /></p>";

                elems += "<p><i>How far is our reach?</i>";
                elems += "<select id='select1'>";
                elems += "<option value='tier0' selected class='opts'>CHOOSE</option>";
                elems += "<option value='Friends' class='opts'>Friends Only(free)</option>";
                elems += "<option value='Local' class='opts'>Local($40)</option>";
                elems += "<option value='Global' class='opts'>Global($120)</option>";
                elems += "</select>";
                elems += "</p>";

                elems += "<p><i>How long are we going to spam this item?</i>";
                elems += "<select id='select2'>";
                elems += "<option value='time0' selected class='opts'>CHOOSE</option>";
                elems += "<option value='4' class='opts'>1 month</option>";
                elems += "<option value='13' class='opts'>3 months</option>";
                elems += "<option value='26' class='opts'>6 months</option>";
                elems += "<option value='52' class='opts'>12 months</option>";
                elems += "</select>";
                elems += "</p>";

                elems += "<p>Total Cost: $<span>0</span></p>";

                elems += "<p><button class='button_off'>⭕</button></p>";

                elems += "<div class='dvMemeHolder' style='background-image:url(../images/memes/ironyFrog.jpg);'>";
                elems += "<span id='spnMeme1Holder' class='spnHolder'></span>";

                elems += "<span id='spnMeme2Holder' class='spnHolder'></span>";
                elems += "</div>";
                elems += "<div id='dvFill'><span id='spnDoc'>&nbsp;</span><span id='spnFrd'>&nbsp;</span><span id='spnT'>&nbsp;</span></div>";

                page.className = "menuPages";
                page.innerHTML = elems;

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var cls = UI.bySelAll(".cls"),
                        spnHolder = UI.bySelAll(".spnHolder"),
                        selects = UI.byTag("select"),
                        dvMemeHolder = UI.bySel(".dvMemeHolder");

                    for (var c = 0; c < cls.length; c++) {
                        cls[c].onkeyup = UI.doTyping(cls, c, spnHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                        cls[c].onblur = UI.doTyping(cls, c, spnHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                    }

                    for (var s = 0; s < selects.length; s++) {

                        selects[s].onblur = UI.selectionMade(selects, s, dvMemeHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                        selects[s].onclick = UI.selectionMade(selects, s, dvMemeHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                    }

                    var xMeme = UI.bySel("#xMeme");
                    xMeme.onclick = UI.xMemeFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp);

                }, 300);
            }
        },
        selectionMade: (selects, s, dvMemeHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                if (s == 0) {
                    dvMemeHolder.style.backgroundImage = "url(../images/memes/" + selects[s].value + ".jpg)"

                    //console.log(selects[s].value);
                }
                if (s == 1) {
                    var spnFrd = UI.bySel("#spnFrd");

                    if (selects[s].value != "tier0") {
                        spnFrd.style.opacity = "0.5";
                        spnFrd.innerHTML = "✔";

                    } else {
                        spnFrd.style.opacity = "1";
                        spnFrd.innerHTML = "&nbsp;";

                    }
                }
                if (s == 2) {
                    var spnT = UI.bySel("#spnT");

                    if (selects[s].value != "time0") {
                        spnT.style.opacity = "0.5";
                        spnT.innerHTML = "✔";

                    } else {
                        spnT.style.opacity = "1";
                        spnT.innerHTML = "&nbsp;";

                    }
                }

                if (selects[s].value == "undefined") {
                    dvMemeHolder.style.backgroundImage = "url(../images/memes/noImage.jpg)"
                }
                UI.listenForData(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
                //selects[s].blur();
            }
        },
        doTyping: (cls, c, spnHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                spnHolder[c].innerHTML = cls[c].value;
                UI.listenForData(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
            }
        },
        listenForData: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            var spnHolder = UI.bySelAll(".spnHolder"),
                spnT = UI.bySel("#spnT"),
                spnFrd = UI.bySel("#spnFrd"),
                spnDoc = UI.bySel("#spnDoc"),
                buttonTg = UI.bySel(".button_off") || UI.bySel(".button_on");

            if (spnHolder[0].innerHTML != "" && spnHolder[1].innerHTML != "") {
                spnDoc.style.opacity = "0.5";
                spnDoc.innerHTML = "✔";
            } else {
                spnDoc.style.opacity = "1";
                spnDoc.innerHTML = "&nbsp;";
            }

            if (spnDoc.innerHTML === "✔" && spnFrd.innerHTML === "✔" && spnT.innerHTML === "✔") {
                buttonTg.innerHTML = "✔";
                buttonTg.className = "button_on";
                buttonTg.onclick = UI.saveProject(spnHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page);
            } else {
                buttonTg.innerHTML = "⭕";
                buttonTg.className = "button_off";
                buttonTg.onclick = null;
            }
        },
        saveProject: (spnHolder, myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                var timerItems = UI.bySelAll(".timerItems"),
                    menuPages = UI.bySel(".menuPages_full") || UI.bySel(".menuPages_full"),
                    projectPanel = UI.bySel(".projectPanel"),
                    selects = UI.byTag("select"),
                    uD = localStorage.getItem("uData"),
                    ud = localStorage.getItem("uData");

                if (uD) {
                    var uuu = JSON.parse(uD);
                }
                /*
                pData = {
                    monthstamp: 0,
                    name: "",
                    power: 0,
                    invest: 0,
                    p_Type: "000",
                    p_Bool: false,
                    t_level: 6
                }
                */

                pData.monthstamp = selects[2].value;
                pData.text_upper = spnHolder[0].innerHTML;
                pData.text_lower = spnHolder[1].innerHTML;
                pData.power = 0;
                pData.invest = selects[1].value;
                pData.p_Type = selects[0].value;
                pData.p_Bool = true;
                pData.t_level = uuu.cre;

                localStorage.setItem("pData", JSON.stringify(pData));

                menuPages.className = "menuPages";

                setTimeout(() => {
                    menuPages.remove();
                    var pd = localStorage.getItem("pData");
                    setTimeout(() => {
                        projectPanel.className = "projectPanel_full";


                        if (pd) {
                            var ppp = JSON.parse(pd);
                        }
                        if (ppp.p_Bool != true) {
                            newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                        } else {
                            newMeme.onclick = null;
                            newMeme.style.opacity = "0.5";
                            newMeme.style.border = "6px inset #E84A5F";
                            newMeme.style.boxShadow = "0 0 1px rgba(220, 220, 220, 1)";
                            UI.updatePanel(projectPanel, myFrame, ud, pd);
                        }

                        researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                        budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                        settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);

                    }, 10);
                }, 1000);
                /*
                var p2 = localStorage.getItem("pData");

                if (p2) {
                    var pp2 = JSON.parse(p2);
                }
                console.log(pp2.monthstamp);
                */
            }
        },
        updatePanel: (projectPanel, myFrame, ud, pd) => {
            var elems,
                mx = localStorage.getItem("moneyStuffs");

            if (mx) {
                var mtsf = JSON.parse(mx);
            }
            if (pd) {
                var ppp = JSON.parse(pd);
            }
            if (ppp.p_Bool != false && projectPanel && ppp.monthstamp > 0) {
                //console.log(ppp.p_Type);💲
                elems = "Current Meme <hr />";
                elems += "Time left: " + ppp.monthstamp + "<br/>";
                elems += "<div id='dvProjMeme' style='background-image:url(../images/memes/" + ppp.p_Type + ".jpg);'>";
                elems += "<span id='spn1Display'>" + ppp.text_upper + "</span>";
                elems += "<span id='spn2Display'>" + ppp.text_lower + "</span>";
                elems += "</div>";
                elems += "💲<span>" + ppp.power + "</span>/week<br/>";
                elems += "Reach <span>" + ppp.invest + "</span><br/>";
                elems += "Level <span>" + ppp.t_level + "</span><br/>";

                projectPanel.innerHTML = elems;
            } else {
                if (projectPanel) {
                    moneyStuffs.mpt = +mtsf.mpt + +ppp.t_level;
                    projectPanel.className = "projectPanel";
                    UI.fixMemeBtn(myFrame, ud);
                    localStorage.setItem("moneyStuffs", JSON.stringify(moneyStuffs));
                }
            }
        },
        fixMemeBtn: (myFrame, ud) => {
            var memePanel = UI.bySel(".memePanel_full") || UI.bySel(".memePanel");

            if (memePanel) {
                setTimeout(() => {
                    memePanel.className = "memePanel";
                    setTimeout(() => {
                        if (memePanel) {
                            memePanel.remove();
                        } 
                        return UI.memesFunc(myFrame, ud); 
                    }, 500);
                }, 500);
            }
            console.log("fixing...");
        },
        xMemeFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                UI.mainClick();
                page.className = "menuPages";

                setTimeout(() => {
                    if (ppp.p_Bool != true) {
                        newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    } else {
                        newMeme.onclick = null;
                    }
                    
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    page.remove();
                }, 1000);
            }
        },
        makeSettings: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp) => {
            return () => {
                UI.mainClick();
                if (dta) {
                    var ddd = JSON.parse(dta);
                }
                var Au = localStorage.getItem("myAu");
                if (Au) {
                    var au = JSON.parse(Au);
                }

                var page = UI.createEle("div"), elems;
                var x = +au.main * 100,
                    y = +au.amb * 100,
                    z = +au.music * 100;

                elems = "<h2><span>⚙ Settings</span><span id='xMeme'>X</span></h2>";
                elems += "<p><button id='homeBtn'>Home</button></p>";
                elems += "<p><strong>Volume</Strong></p>";
                elems += "<p><span>🔊</span> &nbsp; <span><input type='range' id='rng1' value='" + x + "' /></span></p>";
                elems += "<p><span>📣</span> &nbsp; <span><input type='range' id='rng2' value='" + y + "' /></span></p>";
                elems += "<p><span>🎶</span> &nbsp; <span><input type='range' id='rng3' value='" + z + "' /></span></p>";

                page.className = "menuPages";
                page.innerHTML = elems;

                myFrame.appendChild(page);

                newMeme.onclick = null;
                researchMeme.onclick = null;
                budgetMeme.onclick = null;
                settings.onclick = null;

                setTimeout(() => {
                    page.className = "menuPages_full";
                    var xMeme = UI.bySel("#xMeme"),
                        homeBtn = UI.bySel("#homeBtn"),
                        rng1 = UI.bySel("#rng1");

                    xMeme.onclick = UI.xSettFunc(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp);
                  
                    homeBtn.onclick = UI.globalHome;

                    rng1.onmouseup = UI.setMainVol(rng1, au);
                    rng2.onmouseup = UI.setAmbVol(rng2, au);
                    rng3.onmouseup = UI.setMusicVol(rng3, au);
                }, 300);
            }
        },
        xSettFunc: (myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, page, ppp) => {
            return () => {
                UI.mainClick();
                page.className = "menuPages";

                setTimeout(() => {
                    if (ppp.p_Bool != true) {
                        newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings);
                    } else {
                        newMeme.onclick = null;
                        newMeme.style.opacity = "0.5";
                    }
                    researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
                    page.remove();
                }, 1000);
            }
        },
        memesFunc: (myFrame, ud) => {
            var dta = localStorage.getItem("myData"),
                pD = localStorage.getItem("pData");

            if (pD) {
                var ppp = JSON.parse(pD);
            }

            if (ud) {
                var uuu = JSON.parse(ud);
            }

            var memePanel = UI.createEle("div"),
                newMeme = UI.createEle("span"),
                researchMeme = UI.createEle("span"),
                budgetMeme = UI.createEle("span"),
                statusDiv = UI.createEle("div"),
                settings = UI.createEle("span");


            if (ppp.p_Bool != true) {
                newMeme.onclick = UI.makeMemer(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
            } else {
                newMeme.onclick = null;
                newMeme.style.opacity = "0.5";
                newMeme.style.border = "6px inset #E84A5F";
                newMeme.style.boxShadow = "0 0 1px rgba(220, 220, 220, 1)";

            }

            researchMeme.onclick = UI.makeResearch(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
            budgetMeme.onclick = UI.makeMoney(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);
            settings.onclick = UI.makeSettings(myFrame, uuu, dta, newMeme, researchMeme, budgetMeme, settings, ppp);

            newMeme.innerHTML = "💡";
            researchMeme.innerHTML = "🔬";
            budgetMeme.innerHTML = "💰";
            statusDiv.innerHTML = "Status Log <hr />";
            settings.innerHTML = "⚙";

            newMeme.className = "memePanelBtns";
            researchMeme.className = "memePanelBtns";
            budgetMeme.className = "memePanelBtns";
            statusDiv.className = "statusDiv";
            settings.className = "memePanelBtns";

            memePanel.className = "memePanel";

            memePanel.appendChild(newMeme);
            memePanel.appendChild(researchMeme);
            memePanel.appendChild(budgetMeme);
            memePanel.appendChild(statusDiv);
            memePanel.appendChild(settings);

            myFrame.appendChild(memePanel);

            setTimeout(() => {
                memePanel.className = "memePanel_full";
                setTimeout(() => {
                    statusDiv.className = "statusDiv_full";
                    setTimeout(() => {
                        //AI.launchAI(uuu, statusDiv);
                    }, 500);
                }, 400);
            }, 1100);
        },
        doCoinPerTic: (uuu) => {
            var mx = localStorage.getItem("moneyStuffs"),
                moneySlot = UI.bySel("#moneySlot");

            if (mx) {
                var mtsf = JSON.parse(mx);
            }
            var ud = localStorage.getItem("uData");

            if (ud) {
                var uuu = JSON.parse(ud);
            }

            uData.siteName = uuu.siteName;
            uData.userName = uuu.userName;
            uData.money = +uuu.money + +mtsf.mpt;
            uData.lvl = +uuu.lvl;
            uData.gndr = +uuu.gndr;
            uData.hum = +uuu.hum;
            uData.int = +uuu.int;
            uData.cre = +uuu.cre;
            uData.luck = +uuu.luck;
            uData.chr = +uuu.chr;
            uData.spd = +uuu.spd;

            localStorage.setItem("uData", JSON.stringify(uData));

            var lx = localStorage.getItem("uData");
            if (lx) {
                var lxx = JSON.parse(lx);
            }

            moneySlot.innerHTML = lxx.money;
        },
        timeCheck: (play, pause, ud) => {
            return () => {

                var dt = localStorage.getItem("dateTool"),
                    tBool = localStorage.getItem("tBool"),
                    timerItems = UI.bySelAll(".timerItems");


                if (tBool === "0") {
                    
                    play.className = "timeCtrlItems_active";
                    pause.className = "timeCtrlItems";
                    localStorage.setItem("tBool", 1);
                    play.onclick = null;
                    pause.onclick = UI.timeCheck(play, pause);
                    UI.playClick();
                    ticker();

                    function ticker() {

                        var dt = localStorage.getItem("dateTool");
                        var tBl = localStorage.getItem("tBool");
                        if (dt) {
                            var dtt = JSON.parse(dt);
                        }

                        if (ud) {
                            var uuu = JSON.parse(ud);
                        }

                        if (tBl === "1") {

                            setTimeout(() => {

                                if (+dtt.week < +4) {

                                    dateTool.month = +dtt.month;
                                    dateTool.week = +dtt.week + +1;
                                    dateTool.year = +dtt.year;

                                    localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                    timerItems[0].innerHTML = mnth[dtt.month];
                                    timerItems[1].innerHTML = "Week " + dtt.week;
                                    timerItems[2].innerHTML = dtt.year;
                                    UI.doTickRender();
                                    //console.log(uuu.money);
                                    UI.doCoinPerTic(uuu);
                                } else {

                                    dateTool.week = +dtt.week - +3;

                                    if (+dtt.month < +11) {

                                        dateTool.month = +dtt.month + +1;
                                        dateTool.week = +dtt.week - +3;
                                        dateTool.year = +dtt.year;

                                        localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                        timerItems[0].innerHTML = mnth[dtt.month];
                                        timerItems[1].innerHTML = "Week " + dtt.week;
                                        timerItems[2].innerHTML = dtt.year;

                                    } else {

                                        dateTool.month = +dtt.month - +11;
                                        dateTool.week = +dtt.week - +3;
                                        dateTool.year = +dtt.year + +1;

                                        localStorage.setItem("dateTool", JSON.stringify(dateTool));

                                        timerItems[0].innerHTML = mnth[dtt.month];
                                        timerItems[1].innerHTML = "Week " + dtt.week;
                                        timerItems[2].innerHTML = dtt.year;

                                    }
                                }
                                ticker();

                            }, 3100);
                        }
                    }

                } else {
                    pause.className = "timeCtrlItems_active";
                    play.className = "timeCtrlItems";
                    localStorage.setItem("tBool", 0);
                    play.onclick = UI.timeCheck(play, pause);
                    pause.onclick = null;
                    UI.stopClick();
                }

                //var x = localStorage.getItem("tBool");

                //console.log(x);
            }
        },
        doTickRender: () => {
            var myFrame = UI.bySel(".myFrame"),
                projectPanel = UI.bySel(".projectPanel_full"),
                ud = localStorage.getItem("uData"),
                pd = localStorage.getItem("pData");

            if (pd) {
                var ppp = JSON.parse(pd);
            }
            if (ppp.monthstamp > 0) {
                pData.monthstamp = +ppp.monthstamp - +1;
                pData.text_upper = ppp.text_upper;
                pData.text_lower = ppp.text_lower;
                pData.power = ppp.power;
                pData.invest = ppp.invest;
                pData.p_Type = ppp.p_Type;
                pData.p_Bool = true;
                pData.t_level = ppp.t_level;
            } else {
                pData.monthstamp = 0;
                pData.text_upper = pData.text_upper;
                pData.text_lower = pData.text_lower;
                pData.power = pData.power;
                pData.invest = pData.invest;
                pData.p_Type = pData.p_Type;
                pData.p_Bool = false;
                pData.t_level = pData.t_level;
            }

            localStorage.setItem("pData", JSON.stringify(pData));

            UI.updatePanel(projectPanel, myFrame, ud, pd);
            //console.log(ppp.monthstamp);
        },
        doTimerControls: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var tBool = localStorage.getItem("tBool");
            var timeCtrlCell = UI.createEle("div"),
                pause = UI.createEle("span"),
                play = UI.createEle("span");

            pause.innerHTML = "&#10074;&#10074;";
            if (tBool === "0") {
                pause.className = "timeCtrlItems_active";
            } else {
                pause.className = "timeCtrlItems";
                pause.onclick = UI.timeCheck(play, pause, ud);
            }

            play.innerHTML = "&#9658;";
            if (tBool === "1") {
                play.className = "timeCtrlItems_active";
            } else {
                play.className = "timeCtrlItems";
                play.onclick = UI.timeCheck(play, pause, ud);
            }

            timeCtrlCell.className = "timeCtrlCell";

            timeCtrlCell.appendChild(pause);
            timeCtrlCell.appendChild(play);

            myFrame.appendChild(timeCtrlCell);

            setTimeout(() => {
                timeCtrlCell.className = "timeCtrlCell_full";
            }, 900);
        },
        doTimer: (myFrame, ud) => {
            var dt = localStorage.getItem("dateTool");
            if (dt) {
                var ddd = JSON.parse(dt);
            }

            if (ud) {
                var uuu = JSON.parse(ud);
            }

            var timer = UI.createEle("div"),
                month = UI.createEle("span"),
                week = UI.createEle("span"),
                year = UI.createEle("span");

            year.innerHTML = ddd.year;
            year.className = "timerItems";

            week.innerHTML = "Week " + ddd.week + "";
            week.className = "timerItems";

            month.innerHTML = mnth[ddd.month];
            month.className = "timerItems";

            timer.className = "myTimer";

            timer.appendChild(month);
            timer.appendChild(week);
            timer.appendChild(year);

            myFrame.appendChild(timer);

            setTimeout(() => {
                timer.className = "myTimer_full";
            }, 900);
        },
        doTable: (myFrame, ud) => {
            if (ud) {
                var uuu = JSON.parse(ud);
            }
            var table = UI.createEle("div");

            table.className = "theTable";
            for (var i = 1; i < 9; i++) {
                var elems = UI.createEle("div");

                elems.id = "elem_" + i + "";
                elems.className = "playerItems";

                table.appendChild(elems);
            }

            myFrame.appendChild(table);

            setTimeout(() => {
                var playerItems = UI.bySelAll(".playerItems");
                playerItems[0].innerHTML = uuu.siteName;
                playerItems[1].innerHTML = "<span>Level</span> <span>" + uuu.lvl + "</span>";
                playerItems[2].innerHTML = "<span>Humor</span> <span>" + uuu.hum + "</span>";
                playerItems[3].innerHTML = "<span>Intelligence</span> <span>" + uuu.int + "</span>";
                playerItems[4].innerHTML = "<span>Creativity</span> <span>" + uuu.cre + "</span>";
                playerItems[5].innerHTML = "<span>Luck</span> <span>" + uuu.luck + "</span>";
                playerItems[6].innerHTML = "<span>Charisma</span> <span>" + uuu.chr + "</span>";
                playerItems[7].innerHTML = "<span>Speed</span> <span>" + uuu.spd + "</span>";
                setTimeout(() => {
                    table.className = "theTable_full";
                }, 50);
            }, 1000);
        },
        globalHome: () => {
            location.reload();
        },
        mainClick: () => {
            var Au = localStorage.getItem("myAu"),
                snd = new Audio("../css/sounds/main.wav");
            if (Au) {
                var au = JSON.parse(Au);
            }
            snd.volume = au.main;

            snd.play();
        },
        playClick: () => {
            var Au = localStorage.getItem("myAu"),
                snd = new Audio("../css/sounds/play.wav");
            if (Au) {
                var au = JSON.parse(Au);
            }
            snd.volume = au.main;

            snd.play();
        },
        stopClick: () => {
            var Au = localStorage.getItem("myAu"),
                snd = new Audio("../css/sounds/stop.wav");
            if (Au) {
                var au = JSON.parse(Au);
            }
            snd.volume = au.main;

            snd.play();
        },
        tokenClick: () => {
            var Au = localStorage.getItem("myAu"),
                snd = new Audio("../css/sounds/token.wav");
            if (Au) {
                var au = JSON.parse(Au);
            }
            snd.volume = au.main;

            snd.play();

        },
        setMainVol: (rng1, au) => {
            return () => {
                var x = +rng1.value / 100;

                myAu.main = x;

                localStorage.setItem("myAu", JSON.stringify(myAu));
            }
        },
        setAmbVol: (rng2, au) => {
            return () => {
                var x = +rng2.value / 100;

                myAu.amb = x;

                localStorage.setItem("myAu", JSON.stringify(myAu));
            }
        },
        setMusicVol: (rng3, au) => {
            return () => {
                var x = +rng3.value / 100;

                myAu.music = x;

                localStorage.setItem("myAu", JSON.stringify(myAu));
            }
        },

        //global interacts
        goHome: (playerSetupPage, myFrame) => {
            return () => {
                if (playerSetupPage) {
                    playerSetupPage.className = "playerSetupPage";
                }
                setTimeout(() => {
                    myFrame.remove();
                    UI.myLoad();
                }, 1000);
            }
        },
        deleteAllStorage: () => {
            localStorage.clear();
            location.reload();
        }
    }
    //Artificial Intelligence object
    AI = { 
        launchAI: (uuu, statusDiv) => {

            AI.aiChecker(uuu, statusDiv);

        },
        aiChecker: (uuu, statusDiv) => {

            console.log(uuu.lvl);

        }
    }

    window.onload = () => {
        UI.init();
        //console.log(localStorage);
    };
    app.start();

})();
