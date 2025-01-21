"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { Monitor, Moon, Sun } from "./icons"
import { useTheme } from "./ThemeContext"
import { useOuterClick } from "../util/useOuterClick"
import { useParams } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(theme === "dark")
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  useEffect(() => {
    setDarkModeChecked(theme === "dark")
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  useEffect(() => {
    const backgroundElement = document.getElementById("background")
    if (backgroundElement) {
      backgroundElement.style.overflow = menuOpen ? "hidden" : "auto"
    }
  }, [menuOpen])

  if (!mounted) return null

  return (
    <div ref={menubarRef} className="mr-5">
      <Menu as="div" className="relative mt-1 inline-block text-left">
        {({ open }) => (
          <div>
            <MenuButton aria-label={t("theme")} aria-expanded={open}>
              <DarkModeSwitch
                checked={darkModeChecked}
                onChange={(isChecked) => setDarkModeChecked(isChecked)}
                onClick={() => setMenuOpen(!menuOpen)}
                size={24}
                theme={theme}
              />
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <div>
                <MenuItems
                  modal={false}
                  className="z-60 absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg
                    backdrop-blur-sm focus:outline-none"
                >
                  <RadioGroup value={theme} onChange={handleThemeChange}>
                    <div
                      className="rounded-md bg-gradient-to-br from-gray-200/80 via-primary-200/80 to-gray-200/80 p-1 shadow-xl
                        shadow-gray-400 dark:bg-gradient-to-br dark:from-gray-900/80 dark:via-primary-900/80
                        dark:to-gray-900/80 dark:shadow-gray-950 border border-gray-900/50"
                    >
                      <Radio value="light">
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleThemeChange("light")}
                              className={`${
                              focus
                                  ? "bg-primary-400/50 dark:bg-primary-500/30"
                                  : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                              } group text-shadow flex w-full items-center rounded-md p-2 text-sm text-gray-900 dark:text-gray-200
                              text-shadow-black hover:text-secondary-500 dark:hover:text-secondary-500 hover:backdrop-blur-sm`}
                            >
                              <Sun className="size-6" />
                              <span className="ml-2">{t("light")}</span>
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                      <Radio value="dark">
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleThemeChange("dark")}
                              className={`${
                              focus
                                  ? "bg-primary-400/50 dark:bg-primary-500/30"
                                  : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                              } group text-shadow flex w-full items-center rounded-md p-2 text-sm text-gray-700
                              text-shadow-gray-400/80 hover:backdrop-blur-sm dark:text-white dark:text-shadow-black
                              dark:text-shadow-black hover:text-secondary-500 dark:hover:text-secondary-500`}
                            >
                              <Moon className="size-6" />
                              <span className="ml-2">{t("dark")}</span>
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                      <Radio value="system">
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleThemeChange("system")}
                              className={`${
                              focus
                                  ? "bg-primary-400/50 dark:bg-primary-500/30"
                                  : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                              } group text-shadow flex w-full items-center rounded-md p-2 text-sm text-gray-700
                              text-shadow-gray-400/80 hover:text-secondary-500 hover:backdrop-blur-sm dark:text-white
                              dark:text-shadow-black dark:hover:text-secondary-500`}
                              role="menuitem"
                            >
                              <Monitor className="size-6" />
                              <span className="ml-2">{t("system")}</span>
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    </div>
                  </RadioGroup>
                </MenuItems>
              </div>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default ThemeSwitch
