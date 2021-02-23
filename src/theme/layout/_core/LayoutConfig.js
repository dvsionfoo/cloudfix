export function getInitLayoutConfig() {
  return {
      "demo": "cloud-fix",
      "js": {
        "breakpoints": {
          "sm": "576",
          "md": "768",
          "lg": "992",
          "xl": "1200",
          "xxl": "1200"
        },
        "colors": {
          "theme": {
            "base": {
              "white": "#ffffff",
              "primary": "#6993FF",
              "secondary": "#E5EAEE",
              "success": "#1BC5BD",
              "info": "#8950FC",
              "warning": "#FFA800",
              "danger": "#F64E60",
              "light": "#F3F6F9",
              "dark": "#212121"
            },
            "light": {
              "white": "#ffffff",
              "primary": "#E1E9FF",
              "secondary": "#ECF0F3",
              "success": "#C9F7F5",
              "info": "#EEE5FF",
              "warning": "#FFF4DE",
              "danger": "#FFE2E5",
              "light": "#F3F6F9",
              "dark": "#D6D6E0"
            },
            "inverse": {
              "white": "#ffffff",
              "primary": "#ffffff",
              "secondary": "#212121",
              "success": "#ffffff",
              "info": "#ffffff",
              "warning": "#ffffff",
              "danger": "#ffffff",
              "light": "#464E5F",
              "dark": "#ffffff"
            }
          },
          "gray": {
            "gray100": "#F3F6F9",
            "gray200": "#ECF0F3",
            "gray300": "#E5EAEE",
            "gray400": "#D6D6E0",
            "gray500": "#B5B5C3",
            "gray600": "#80808F",
            "gray700": "#464E5F",
            "gray800": "#1B283F",
            "gray900": "#212121"
          }
        },
        "fontFamily": "Poppins"
      },
      "self": {
        "layout": "default"
      },
      "loader": {
        "enabled": true,
        "type": "",
        "logo": "/media/logos/cloud-fix-dark-sm.png",
        "message": "Please wait..."
      },
      "header": {
        "self": {
          "width": "fixed",
          "fixed": {
            "desktop": false,
            "mobile": false
          },
          "theme": "light"
        },
        "menu": {
          "self": {
            "display": true,
            "layout": "tab",
            "root-arrow": false,
            "icon-style": "duotone"
          },
          "desktop": {
            "arrow": true,
            "toggle": "click",
            "submenu": {
              "theme": "light",
              "arrow": true
            }
          },
          "mobile": {
            "submenu": {
              "theme": "dark",
              "accordion": true
            }
          }
        }
      },
      "subheader": {
        "display": false,
        "displayDesc": false,
        "displayDaterangepicker": true,
        "breadcrumb": {
          "display": true
        },
        "layout": "subheader-v1",
        "fixed": true,
        "width": "fluid",
        "clear": false,
        "style": "solid"
      },
      "content": {
        "width": "fixed"
      },
      "aside": {
        "self": {
          "display": false,
          "theme": "dark",
          "fixed": true,
          "minimize": {
            "toggle": true,
            "default": false,
            "hoverable": true
          }
        },
        "menu": {
          "dropdown": false,
          "scroll": true,
          "icon-style": "duotone",
          "submenu": {
            "accordion": true,
            "dropdown": {
              "arrow": true,
              "hover-timeout": 500
            }
          }
        },
        "footer": {
          "self": {
            "display": true
          }
        }
      },
      "footer": {
        "width": "fixed",
        "layout": "compact",
        "self": {
          "fixed": true,
          "width": "fluid"
        }
      },
      "extras": {
        "search": {
          "display": false,
          "layout": "dropdown",
          "offcanvas": {
            "direction": "right"
          }
        },
        "notifications": {
          "display": false,
          "layout": "dropdown",
          "dropdown": {
            "style": "dark"
          },
          "offcanvas": {
            "direction": "right",
            "directions": "right"
          }
        },
        "quick-actions": {
          "display": false,
          "layout": "dropdown",
          "dropdown": {
            "style": "dark"
          },
          "offcanvas": {
            "direction": "right",
            "directions": "right"
          }
        },
        "cart": {
          "display": false,
          "layout": "dropdown",
          "offcanvas": {
            "direction": "dark"
          },
          "dropdown": {
            "style": "dark"
          }
        },
        "chat": {
          "display": false
        },
        "user": {
          "display": true,
          "layout": "dropdown",
          "dropdown": {
            "style": "dark"
          },
          "offcanvas": {
            "direction": "right",
            "directions": "right"
          }
        },
        "languages": {
          "display": false
        },
        "quick-panel": {
          "display": false,
          "offcanvas": {
            "direction": "right",
            "directions": "right"
          }
        },
        "toolbar": {
          "display": false
        },
        "scrolltop": {
          "display": true
        }
      },
      "toolbar": {
        "display": false
      },
      "brand": {
        "self": {
          "theme": "dark"
        }
      }
    }
}
