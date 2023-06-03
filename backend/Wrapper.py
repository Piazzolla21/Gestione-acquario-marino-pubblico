import pymssql

class Wrapper:
    #192.168.40.16
    def __init__(self, server="5.172.64.20\SQLEXPRESS", db="CRD2122", usr="CRD2122", psw="xxx123##"):
        self._server = server
        self._db = db
        self._usr = usr
        self._psw = psw
    
    #connessione
    def connect(self):
        try:
            con = pymssql.connect(self._server, self._usr, self._psw, self._db)
            print("Connessione Riuscita")
            return con
        except Exception as e:
            print("Errore Durante La Connesione")
            print(e)
    
    #disconnessione
    def disconnect(self, con):
        try:
            con.close()
        except Exception as e:
            print("Errore Disconnessione")
            print(e)
    
    # Visualizza Tabelle
    def visua(self, tabella):
        con = self.connect()
        try:
            cur = con.cursor(as_dict = True)
            if tabella == "V_Vasca":
                query = "SELECT * FROM V_Vasca"
            elif tabella == "V_Sensore":
                query = "SELECT * FROM V_Sensore"
                cur.execute(query)
                res = cur.fetchall()
                for x in res:
                    x['Max'] = int(x['Max'])
                    x['Min'] = int(x['Min'])
                    x['Valore'] = int(x['Valore'])
                print(res)
                return res
            elif tabella == "V_ParametriOperativi":
                query = "SELECT * FROM V_ParametriOperativi"
                cur.execute(query)
                res = cur.fetchall()
                for x in res:
                    x['DataOra'] = str(x['DataOra'])
                print(res)
                return res
            cur.execute(query)
            res = cur.fetchall()
            #print(res)
            return res
        except Exception as e:
            print("Errore Durante L'Operazione")
            print(e)
            self.disconnect(con)
   
    #Inserimento di un record nella tabella
    def insert(self, tabella, dati):
        con = self.connect()
        print(dati)
        try:
            cur = con.cursor()
            if tabella == "V_ParametriOperativi":
                query = "INSERT INTO V_ParametriOperativi VALUES (%s, %s, %s, %d)"
            elif tabella == "V_Sensore":
                query = "INSERT INTO V_Sensore VALUES (%d, %d, %s, %d, %s, %d)"
            elif tabella == "V_Vasca":
                query = "INSERT INTO V_Vasca VALUES (%d, %d)"
            cur.execute(query, dati)
            con.commit()
            return {'esito': 'OK'}
            print("Operazione Riuscita")
        except Exception as e:
            print("Errore Durante L'Operazione")
            print(e)
            self.disconnect(con)
    
    #Modifica di un record in base all'id
    def update(self, dati, tabella):
        con = self.connect()
        try:
            cur = con.cursor()
            if tabella == "V_Vasca":
                query = "UPDATE V_Vasca  SET IDSale = %d, IDAcquario = %d WHERE ID = %d"
            elif tabella == "V_Sensore":
                query = "UPDATE V_Sensore SET Min = %d, Max = %d, UnitàDiMisura = %s, Valore = %d, Nome = %s, IDVasca = %d WHERE ID = %d"
            elif tabella == "V_ParametriOperativi":
                query = "UPDATE V_ParametriOperativi SET Nome = %s, UnitàDiMisura = %s, DataOra = %s, IDVasca = %d WHERE ID = %d"
            cur.execute(query, dati)
            con.commit()
            self.disconnect(con)
        except Exception as e:
            print("Errore Durante L'Operazione")
            print(e)
            self.disconnect(con) 
    
    #Eliminazione di un record in base all'id
    def canc(self, id, tabella):
        con = self.connect()
        try:
            cur = con.cursor()
            if tabella == "V_Vasca":
                query = "DELETE FROM V_Vasca WHERE ID = %d"
            elif tabella == "V_Sensore":
                query = "DELETE FROM V_Sensore WHERE ID = %d"
            elif tabella == "V_ParametriOperativi":
                query = "DELETE FROM V_ParametriOperativi WHERE ID = %d"
            cur.execute(query, id)
            #con.commit()
            self.disconnect(con)
            return {"esito": "Ok"}
        except Exception as e:
            print("Errore Durante L'Operazione")
            print(e)
            self.disconnect(con)
            return {"esito": "Ko"}
