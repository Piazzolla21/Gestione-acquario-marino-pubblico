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
        data = cherrypy.request.json
        print(data)
        res = {}
        if tabella == "V_ParametriOperativi":
            res = self.wrp.insert(tabella,(data["Nome"],data['UnitaDiMisura'],data['DataOra'],data['IDVasca']))
        elif tabella == "V_Sensore":
            res = self.wrp.insert(tabella,(data["Min"],data['Max'],data['UnitaDiMisura'],data['Valore'],data['Nome'],data['IDVasca']))
        elif tabella == "V_Vasca":
            res = self.wrp.insert(tabella,(data["IDSale"],data["IDAcquario"]))
        else:
            res =  {"errore" : "tabella non valida"}
        return {'esito' : res}
    
    @cherrypy.expose
    @cherrypy.tools.json_out()
    @cherrypy.tools.json_in()
    def PUT(self,tabella) : 
        print('ciaoa')
        data = cherrypy.request.json
        if tabella == "V_ParametriOperativi":
            res = self.wrp.update(tabella,(data["Nome"],data['UnitaDiMisura'],data['DataOra'],data['IDVasca'],data['ID']))
        elif tabella == "V_Sensore":
            res = self.wrp.update(tabella,(data["Min"],data['Max'],data['UnitaDiMisura'],data['Valore'],data['Nome'],data['IDVasca'],data['ID']))
        elif tabella == "V_Vasca":
            res = self.wrp.update(tabella,(data["IDSale"],data["IDAcquario"],data['ID']))
        else:
            res =  {"errore" : "tabella non valida"}
        return {'esito' : res}
    
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def DELETE(self,id,tabella):
        res = self.wrp.canc(id,tabella)
        return {'esito' : res}
        
    
    
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
        