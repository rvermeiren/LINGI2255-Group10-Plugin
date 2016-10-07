#/**********************************************************\ 
#
# Auto-Generated Plugin Configuration file
# for WeCitizens
#
#\**********************************************************/

set(PLUGIN_NAME "WeCitizens")
set(PLUGIN_PREFIX "WCi")
set(COMPANY_NAME "WeCitizens")

# ActiveX constants:
set(FBTYPELIB_NAME WeCitizensLib)
set(FBTYPELIB_DESC "WeCitizens 1.0 Type Library")
set(IFBControl_DESC "WeCitizens Control Interface")
set(FBControl_DESC "WeCitizens Control Class")
set(IFBComJavascriptObject_DESC "WeCitizens IComJavascriptObject Interface")
set(FBComJavascriptObject_DESC "WeCitizens ComJavascriptObject Class")
set(IFBComEventSource_DESC "WeCitizens IFBComEventSource Interface")
set(AXVERSION_NUM "1")

# NOTE: THESE GUIDS *MUST* BE UNIQUE TO YOUR PLUGIN/ACTIVEX CONTROL!  YES, ALL OF THEM!
set(FBTYPELIB_GUID 92a29a5e-fb00-5b61-aaf8-d6e3c6e6dc98)
set(IFBControl_GUID ff4d42ea-aae5-5bbe-941a-cf91d81103e7)
set(FBControl_GUID ee2d55b8-8c8b-5fc8-8931-f73527e77aba)
set(IFBComJavascriptObject_GUID c40ea124-932e-57f7-aa59-1f0dd46a9f4d)
set(FBComJavascriptObject_GUID 52512dc3-454c-5bd9-a684-574c5196ae8f)
set(IFBComEventSource_GUID aae88838-ec88-56fb-b78a-041d44a2cdc7)
if ( FB_PLATFORM_ARCH_32 )
    set(FBControl_WixUpgradeCode_GUID aec1ee96-1634-5e2e-bfcd-26a3bd28496f)
else ( FB_PLATFORM_ARCH_32 )
    set(FBControl_WixUpgradeCode_GUID 986316df-9b2a-5cd6-9abc-23ee76f8e88f)
endif ( FB_PLATFORM_ARCH_32 )

# these are the pieces that are relevant to using it from Javascript
set(ACTIVEX_PROGID "WeCitizens.WeCitizens")
if ( FB_PLATFORM_ARCH_32 )
    set(MOZILLA_PLUGINID "wecitizens.be/WeCitizens")  # No 32bit postfix to maintain backward compatability.
else ( FB_PLATFORM_ARCH_32 )
    set(MOZILLA_PLUGINID "wecitizens.be/WeCitizens_${FB_PLATFORM_ARCH_NAME}")
endif ( FB_PLATFORM_ARCH_32 )

# strings
set(FBSTRING_CompanyName "WeCitizens")
set(FBSTRING_PluginDescription "This plugin will spot the name of every politicians that you encounter within the web!")
set(FBSTRING_PLUGIN_VERSION "1.0.0.0")
set(FBSTRING_LegalCopyright "Copyright 2016 WeCitizens")
set(FBSTRING_PluginFileName "np${PLUGIN_NAME}")
if (APPLE)
    # On apple, np is not needed
    set(FBSTRING_PluginFileName "${PLUGIN_NAME}")
endif()
set(FBSTRING_ProductName "WeCitizens")
set(FBSTRING_FileExtents "")
if ( FB_PLATFORM_ARCH_32 )
    set(FBSTRING_PluginName "WeCitizens")  # No 32bit postfix to maintain backward compatability.
else ( FB_PLATFORM_ARCH_32 )
    set(FBSTRING_PluginName "WeCitizens_${FB_PLATFORM_ARCH_NAME}")
endif ( FB_PLATFORM_ARCH_32 )
set(FBSTRING_MIMEType "application/x-wecitizens")

# Uncomment this next line if you're not planning on your plugin doing
# any drawing:

#set (FB_GUI_DISABLED 1)

# Mac plugin settings. If your plugin does not draw, set these all to 0
set(FBMAC_USE_QUICKDRAW 0)
set(FBMAC_USE_CARBON 1)
set(FBMAC_USE_COCOA 1)
set(FBMAC_USE_COREGRAPHICS 1)
set(FBMAC_USE_COREANIMATION 0)
set(FBMAC_USE_INVALIDATINGCOREANIMATION 0)

# If you want to register per-machine on Windows, uncomment this line
#set (FB_ATLREG_MACHINEWIDE 1)
