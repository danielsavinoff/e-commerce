// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { useEffect } from "react"
import { clsx } from "keycloakify/tools/clsx"
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate"
import { type TemplateProps } from "keycloakify/login/TemplateProps"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { KcContext } from "./kcContext"
import type { I18n } from "./i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react"

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    displayWide = false,
    showAnotherWayIfPresent = true,
    headerNode,
    showUsernameNode = null,
    infoNode = null,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props

  const { getClassName } = useGetClassName({ doUseDefaultCss, classes })

  const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } =
    i18n

  const { realm, locale, auth, url, message, isAppInitiatedAction } = kcContext

  const { isReady } = usePrepareTemplate({
    doFetchDefaultThemeResources: false,
    styles: [
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly.min.css`,
      `${url.resourcesCommonPath}/node_modules/patternfly/dist/css/patternfly-additions.min.css`,
      `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
      `${url.resourcesPath}/css/globals.css`,
    ],
    htmlClassName: getClassName("kcHtmlClass"),
    bodyClassName: getClassName("kcBodyClass"),
    htmlLangProperty: locale?.currentLanguageTag,
    documentTitle: i18n.msgStr("loginTitle", kcContext.realm.displayName),
  })

  useEffect(() => {
    console.log(
      `Value of MY_ENV_VARIABLE on the Keycloak server: "${kcContext.properties.MY_ENV_VARIABLE}"`,
    )
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <div className="w-full min-h-dvh grid items-center">
      <Card className="mx-auto w-full max-w-sm border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-2xl">{headerNode}</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="kc-content-wrapper">
            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== "warning" || !isAppInitiatedAction) && (
                <Alert
                  className="mb-4"
                  variant={message.type === "error" ? "destructive" : "default"}
                >
                  {message.type === "success" && (
                    <CircleCheck className="h-4 w-4" />
                  )}
                  {message.type === "warning" && (
                    <TriangleAlert className="h-4 w-4" />
                  )}
                  {message.type === "error" && <CircleX className="h-4 w-4" />}
                  {message.type === "info" && <Info className="h-4 w-4" />}
                  <AlertTitle>
                    {`${message.type[0].toUpperCase()}${message.type.substring(1)}`}
                  </AlertTitle>
                  <AlertDescription>{message.summary}</AlertDescription>
                </Alert>
              )}
            {children}
            {auth !== undefined &&
              auth.showTryAnotherWayLink &&
              showAnotherWayIfPresent && (
                <form
                  id="kc-select-try-another-way-form"
                  action={url.loginAction}
                  method="post"
                  className={clsx(
                    displayWide && getClassName("kcContentWrapperClass"),
                  )}
                >
                  <div
                    className={clsx(
                      displayWide && [
                        getClassName("kcFormSocialAccountContentClass"),
                        getClassName("kcFormSocialAccountClass"),
                      ],
                    )}
                  >
                    <div className={getClassName("kcFormGroupClass")}>
                      <input type="hidden" name="tryAnotherWay" value="on" />
                      <a
                        href="#"
                        id="try-another-way"
                        onClick={() => {
                          document.forms[
                            "kc-select-try-another-way-form" as never
                          ].submit()
                          return false
                        }}
                      >
                        {msg("doTryAnotherWay")}
                      </a>
                    </div>
                  </div>
                </form>
              )}
            {displayInfo && (
              <div id="kc-info" className={getClassName("kcSignUpClass")}>
                <div
                  id="kc-info-wrapper"
                  className={getClassName("kcInfoAreaWrapperClass")}
                >
                  {infoNode}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
