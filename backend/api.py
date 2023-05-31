import cherrypy 

from Wrapper import Wrapper

@cherrypy.expose
class Page():
    wrp = Wrapper()
    @cherrypy.expose
    @cherrypy.tools.json_out()
    def GET(self,tabella):
        return self.wrp.visua(tabella)
    
cherrypy.quickstart(Page())
        