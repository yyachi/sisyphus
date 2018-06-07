(function() {

    si.ui.theme = {
        textColor : '#000000',
        grayTextColor : '#888888',
        headerColor : '#333333',
        lightBlue : '#006cb1',
        darkBlue : '#93caed',
        fontFamily : si.os({
            iphone : 'Helvetica Neue',
            android : 'Droid Sans'
        })
    };

    si.ui.properties = {
        platformWidth : Ti.Platform.displayCaps.platformWidth,
        platformHeight : Ti.Platform.displayCaps.platformHeight,
        iPhoneStatusBarHeight : 20,
        iPhoneNavBarHeight : 44,
        iPhoneTabBarHeight : 49,
        Busion : {
            backgroundImage : 'images/button_bg.png',
            height : 50,
            width : 250,
            color : '#000',
            font : {
                fontSize : 18,
                fontWeight : 'bold'
            }
        },
        Label : {
            color : si.ui.theme.textColor,
            font : {
                fontFamily : si.ui.theme.fontFamily,
                fontSize : 12
            },
            height : 'auto'
        },
        Window : {
            backgroundImage : 'images/ruff.png',
            navBarHidden : true,
            softInputMode : (Ti.UI.Android) ? Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE : ''
        },
        TableView : {
            backgroundImage : 'images/ruff.png',
            separatorStyle : (Ti.Platform.name == 'iPhone OS') ? Ti.UI.iPhone.TableViewSeparatorStyle.NONE : ''
        },
        TableViewRow : {
            selectedBackgroundColor : si.ui.theme.darkBlue, //I know, this is dumb, but it's currently inconsistent x-platform
            backgroundSelectedColor : si.ui.theme.darkBlue,
            className : 'tvRow'
        },
        TextField : {
            width : '90%',
            autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
            borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            paddingLeft : 5, // pad left by 20 pixels
            paddingRight : 5, // pad right by 20 pixels
//            color : '#000000'
        },
        TextArea : {
            borderRadius : 10,
            backgroundColor : '#efefef',
            backgroundGradient : {
                type : 'linear',
                colors : [{
                    color : '#efefef',
                    position : 0.0
                }, {
                    color : '#cdcdcd',
                    position : 0.50
                }, {
                    color : '#efefef',
                    position : 1.0
                }]
            }
        },


        NormalButton : {
            width : '90%',
            height : '15%'
        },
        ToolBarButton : {
            height : 90,
            width : Ti.UI.SIZE
        },
        RightBottomButton : {
            width : '40%',
            height : 80,
            right : '2%',
            bottom : '2%',
            // backgroundColor : 'white',
            // borderColor : 'black',
            // borderWidth : 1,
            // borderRadius : 10
        },

        LeftBottomButton : {
            width : '40%',
            height : 80,
            left : '2%',
            bottom : '2%',
            // backgroundColor : 'white',
            // borderColor : 'black',
            // borderWidth : 1,
            // borderRadius : 10
        },


        animationDuration : 500,
        stretch : {
            top : 0,
            bottom : 0,
            left : 0,
            right : 0
        },
        variableTopRightButton : {
            top : 5,
            right : 5,
            height : 30,
            width : si.os({
                iphone : 60,
                android : 'auto'
            }),
            color : '#ffffff',
            font : {
                fontSize : 12,
                fontWeight : 'bold'
            },
            backgroundImage : 'images/button_bg_black.png'
        },
        topRightButton : {
            top : 5,
            right : 5,
            height : 30,
            width : 38
        },
        headerText : {
            top : 8,
            height : 'auto',
            textAlign : 'center',
            color : si.ui.theme.headerColor,
            font : {
                fontFamily : si.ui.theme.fontFamily,
                fontSize : 18,
                fontWeight : 'bold'
            }
        },
        headerView : {
            backgroundImage : 'images/header_bg.png',
            height : 40
        },
        boldHeaderText : {
            height : 'auto',
            color : si.ui.theme.grayTextColor,
            font : {
                fontFamily : si.ui.theme.fontFamily,
                fontSize : 30,
                fontWeight : 'bold'
            }
        },
        smallText : {
            //color : si.ui.theme.grayTextColor,
            font : {
                fontFamily : si.ui.theme.fontFamily,
                fontSize : 20
            },
            height : 'auto'
        },
        logText : {
            color : si.ui.theme.grayTextColor,
            font : {
                fontFamily : si.ui.theme.fontFamily,
                fontSize : 20
            },
            height : 'auto'
        },
        spacerRow : {
            backgroundImage : 'images/spacer_row.png',
            height : 36,
            className : 'spacerRow'
        },
        small_label : {
            text : ' ',
            color : '#111',
            textAlign : 'left',
            height : 'auto',
            font : {
                fontWeight : 'bold',
                fontSize : 13
            }
        },
        medium_label : {
            text : ' ',
            color : '#111',
            textAlign : 'left',
            height : 'auto',
            font : {
                fontWeight : 'bold',
                fontSize : 16
            }
        },
        large_label : {
            text : ' ',
            color : '#111',
            textAlign : 'left',
            height : 'auto',
            font : {
                fontWeight : 'bold',
                fontSize : 36
            }
        },
        avatar_medium : {
            image : '',
            backgroundColor : '#000000',
            width : 90,
            height : 90
        },
    };
})();

var $$ = si.ui.properties; 
