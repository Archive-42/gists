import requests 

url = "http://127.0.0.1:8000"
data = {'APIKey':"", 
        'Query':'select sysdate from dual'}
r = requests.post(url = url, data = data) 
  
print(r.status_code)
print(r.headers) 
print(r.text) 