#!/usr/bin/env python
# coding: utf-8

# In[7]:


import requests
from pprint import pprint
from IPython.core.display import display, HTML
from markdownify import markdownify as md
import json
import re
import urllib.request
from unidecode import unidecode
from datetime import datetime


# In[8]:


IMPO_ENDPOINT='https://www.impo.com.uy/bases/'
LUC='leyes/19889-2020/'
ARTICULOS=[1, 4, 5, 10, 11,12, 13, 14, 18, 21, 22, 23, 24, 35, 43, 44, 45, 49, 50, 51, 52, 56, 63, 64, 65, 74, 75, 76, 77, 78, 79, 80, 86, 118, 125, 126, 127, 128, 129, 130, 134, 135, 136, 140, 142, 143, 144, 145, 146, 148, 151, 152, 155, 156, 158, 159, 160, 161, 163, 167, 169, 171, 172, 183, 184, 185, 186, 193, 198, 206, 207, 208, 209, 210, 211, 212, 215, 219, 220, 221, 224, 225, 235, 236, 237, 285, 357, 358, 392, 399, 403, 404, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 468, 469, 470, 471, 472, 473, 474, 475, 476]
#ARTICULOS=[426]


# In[9]:


def getJsonFromUrl(url):
    
    params = dict(
    json='true',
    )
    
    resp = requests.get(url=url, params=params)
    
    data = None
    try:
        data = json.loads(resp.text, strict=False)
    except Exception as e:
        print(resp.text)
        data = json.loads(unidecode(resp.text), strict=False)
    
    return data


# In[10]:


def getAnteriorOriginal(notasArticulo):
    textoOriginal = None
    if (notasArticulo):
        textosOriginales = md(notasArticulo).split('**TEXTO ORIGINAL:**')
        if len(textosOriginales) > 1:
            #Saco de las notas el link y referencia del texto original
            textosOriginales = textosOriginales[1].split(',')
            linkUltimoTextoOriginal = 'https://www.impo.com.uy'+textosOriginales[0].split('](')[1].split(')')[0]
            #Descargo el texto original y me quedo con el texto
            data_articulo_original = getJsonFromUrl(linkUltimoTextoOriginal)
            textoOriginal = md(data_articulo_original['textoArticulo'],strip=['a','b'])
    return textoOriginal


# In[11]:


def buscarRedaccionModificada(tipo, destino):
    textoOriginalMarkdown = None
    textoModificadoMarkdown = None
    
    if ('nueva redaccion' in unidecode(tipo) or 'agrego a' in unidecode(tipo)):
        data_nueva_redaccion = getJsonFromUrl(destino)
        textoModificadoMarkdown = md(data_nueva_redaccion['textoArticulo'],strip=['a','b'])
        textoOriginalMarkdown = getAnteriorOriginal(md(data_nueva_redaccion['notasArticulo']))
    else:
        print(tipo,destino)
    
    return textoOriginalMarkdown, textoModificadoMarkdown


# In[12]:


tipos = []

for articulo in ARTICULOS:    
    rich_data = {}
    data = getJsonFromUrl(IMPO_ENDPOINT+LUC+str(articulo))
    
    now = datetime.now() # current date and time
    date_time = now.strftime("%d/%m/%Y, %H:%M:%S")    
    rich_data['fechaDescarga'] = date_time
    rich_data['json_original'] = data
    #Saco datos
    rich_data['numeroArticulo'] = str(articulo)
    rich_data['seccionArticulo'] = re.search(r'SECCIÓN (.*?) ', data['tituloArticulo']).group(1)
    try:
        rich_data['capituloArticulo'] = re.search(r'CAPÍTULO (.*?) ', data['tituloArticulo']).group(1)
    except Exception as ignore:
        rich_data['capituloArticulo'] = None
    rich_data['textoArticulo'] = md(data['textoArticulo'], strip=['a','b'])
   
    
    if (data.get('notasArticulo', None)):
        #Paso a Markdown
        notas_articulo_markdown = md(data.get('notasArticulo', ''))
        #Completo Links
        notas_articulo_markdown = notas_articulo_markdown.replace('/bases/','https://www.impo.com.uy/bases/')        
        #Separo
        tipo_modificacion = re.search(r'\*\*(.*?)\*\*', notas_articulo_markdown).group(1)
        destino_modificacion = re.search(r'\((.*?)\)', notas_articulo_markdown).group(1)
       
        textoOriginal, textoModificado = buscarRedaccionModificada(tipo_modificacion, destino_modificacion)
        
        rich_data['notasArticulo'] = md(data.get('notasArticulo', ''), strip=['a','b'])
        rich_data['textoOriginal'] = textoOriginal
        rich_data['textoModificado'] = textoModificado
        
    if not rich_data.get('textoOriginal',None):
        rich_data['textoOriginal'] = rich_data['textoArticulo']
    print(rich_data['seccionArticulo'], rich_data['capituloArticulo'],  rich_data['numeroArticulo'])
    json_file = open('LUC_articulo_'+rich_data['numeroArticulo']+'.json', "w")
    json_file.write(json.dumps(rich_data, indent=4))
    json_file.close()


# In[ ]:





# In[ ]:





# In[ ]:




