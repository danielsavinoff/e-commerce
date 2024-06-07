import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { KcContext } from "../kcContext"
import type { I18n } from "../i18n"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>,
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  })

  const {
    url,
    register,
    realm,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext

  const { msg, msgStr } = i18n

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={msg("registerTitle")}
    >
      <form
        id="kc-register-form"
        action={url.registrationAction}
        method="post"
        className="grid gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">{msg("firstName")}</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={register.formData.firstName ?? ""}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">{msg("lastName")}</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={register.formData.lastName ?? ""}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className={getClassName("kcLabelClass")}>
            {msg("email")}
          </Label>

          <Input
            type="text"
            id="email"
            className={getClassName("kcInputClass")}
            name="email"
            defaultValue={register.formData.email ?? ""}
            autoComplete="email"
          />
        </div>
        {!realm.registrationEmailAsUsername && (
          <div className="grid gap-2">
            <Label htmlFor="username">{msg("username")}</Label>
            <Input
              type="text"
              id="username"
              className={getClassName("kcInputClass")}
              name="username"
              defaultValue={register.formData.username ?? ""}
              autoComplete="username"
            />
          </div>
        )}
        {passwordRequired && (
          <>
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className={getClassName("kcLabelClass")}
              >
                {msg("password")}
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
              />
            </div>

            <div className="grid gap-2">
              <Label
                htmlFor="password-confirm"
                className={getClassName("kcLabelClass")}
              >
                {msg("passwordConfirm")}
              </Label>
              <Input
                type="password"
                id="password-confirm"
                name="password-confirm"
              />
            </div>
          </>
        )}
        {recaptchaRequired && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              ></div>
            </div>
          </div>
        )}
        <div className="grid gap-2">
          <Button type="submit">{msgStr("doRegister")}</Button>
          <a href={url.loginUrl} className="mx-auto underline">
            {msg("backToLogin")}
          </a>
        </div>
      </form>
    </Template>
  )
}
