package main

import (
	"github.com/labstack/echo"
	"github.com/gorilla/sessions"
)

var (
	key = []byte("super-secret-key")
	store = sessions.NewCookieStore(key)
)

type API struct{}

func (api *API) Bind(group *echo.Group) {
	group.GET("/v1/conf", api.ConfHandler)
	group.POST("/login", api.loginHandler)
	group.POST("/login/check", api.checkLoginHandler)
}

func (api *API) ConfHandler(c echo.Context) error {
	app := c.Get("app").(*App)
	return c.JSON(200, app.Conf.Root)
}

func (api *API) loginHandler(c echo.Context) error {

	session, _ := store.Get(c.Request(), "auth")
	session.Values["authenticated"] = true
	session.Save(c.Request(), c.Response())

	return c.JSON(200, echo.Map{
		"msg": "Auth successfully",
		"status": "1",
	})
}


func (api *API) checkLoginHandler(c echo.Context) error {

	session, _ := store.Get(c.Request(), "auth")

	// Check if user is authenticated
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		return c.JSON(403, echo.Map{
			"msg": "Forbidden",
			"status": "0",
		})		
	}

	return c.JSON(200, echo.Map{
		"msg": "Ok",
		"status": "1",
	})
}
