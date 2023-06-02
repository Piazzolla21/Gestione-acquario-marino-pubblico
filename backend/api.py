import cherrypy 

from Wrapper import Wrapper

@cherrypy.expose
class Page():
    wrp = Wrapper()
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def GET(self,tabella):
        return self.wrp.visua(tabella)
    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def POST(self,tabella):
        data = cherrypy.response.json
        res = {}
        if tabella == "V_ParametriOperativi":
            res = self.wrp.inserisci(tabella,(data["IDSale"],data["IDAcquario"]))
        elif tabella == "V_Sensore":
            res = self.wrp.inserisci(tabella,(data["IDSale"],data["IDAcquario"]))
        elif tabella == "V_Vasca":
            res = self.wrp.inserisci(tabella,(data["IDSale"],data["IDAcquario"]))
        else:
            res =  {"errore" : "tabella non valida"}
        return res
    
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def DELETE(self,id,tabella):
        res = self.wrp.canc(id,tabella)
        return res
        
    
    
conf = {
    '/': {
        'request.dispatch': cherrypy.dispatch.MethodDispatcher(),
        'tools.sessions.on': True,
        'tools.response_headers.on': True,
        #'tools.response_headers.headers': [('Content-Type', 'application/json')]
        #devo aggiungere l'header "Access-Control-Allow-Origin" per abilitare le richieste da un dominio differente
        'tools.response_headers.headers': [
            #('Content-Type', 'application/json'), 
            ('Access-Control-Allow-Origin', '*'), 
            #("Access-Control-Allow-Headers", "*")
            #("Access-Control-Allow-Headers", "X-Requested-With")
            ("Access-Control-Allow-Headers", "ngrok-skip-browser-warning")
        ],
        #tolgo l'autenticazione per il momento
        #'tools.auth_basic.on': True,
        #'tools.auth_basic.realm': MyController.RLM,
        #'tools.auth_basic.checkpassword': MyController.validate_password
    }
}  
    
cherrypy.quickstart(Page(),config=conf)
        