#!/usr/bin/env python
# coding: utf-8

# In[83]:


import requests
from pprint import pprint
from IPython.core.display import display, HTML
from markdownify import markdownify as md
import json
import re
import urllib.request


# In[65]:


IMPO_ENDPOINT='https://www.impo.com.uy/bases/'
LUC='codigo-penal/9155-1933/'
ARTICULOS=[1, 4, 5, 10, 11,12, 13, 14, 18, 21, 22, 23, 24, 35, 43, 44, 45, 49, 50, 51, 52, 56, 63, 64, 65, 74, 75, 76, 77, 78, 79, 80, 86, 118, 125, 126, 127, 128, 129, 130, 134, 135, 136, 140, 142, 143, 144, 145, 146, 148, 151, 152, 155, 156, 158, 159, 160, 161, 163, 167, 169, 171, 172, 183, 184, 185, 186, 193, 198, 206, 207, 208, 209, 210, 211, 212, 215, 219, 220, 221, 224, 225, 235, 236, 237, 285, 357, 358, 392, 399, 403, 404, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 468, 469, 470, 471, 472, 473, 474, 475, 476]


# In[81]:


def getAnteriorOriginal(notasArticulo):
    anteriorOriginal = {}
    
    if (notasArticulo):
        textosOriginales = md(notasArticulo).split('**TEXTO ORIGINAL:**')
        if len(textosOriginales) > 1:
            
            #Saco de las notas el link y referencia del texto original
            textosOriginales = textosOriginales[1].split(',')
            textosOriginalesSinLinks = md(notasArticulo, strip=['a']).split('**TEXTO ORIGINAL:**')[1].split(',')
            ultimoTextoOriginalSinLink = textosOriginalesSinLinks[0].strip()
            anteriorOriginal['referencia'] = ultimoTextoOriginalSinLink
            anteriorOriginal['link'] = 'https://www.impo.com.uy'+textosOriginales[0].split('](')[1].split(')')[0]

            #Descargo el texto original y lo guardo
            resp = requests.get(url=anteriorOriginal['link'], params=params)
            data = resp.json(strict=False)
            anteriorOriginal['textoArticulo'] = data['textoArticulo']
            anteriorOriginal['textoArticuloMarkdown'] = md(data['textoArticulo'])
    return anteriorOriginal


# In[87]:


params = dict(
    json='true',
)

for articulo in ARTICULOS:
    print('Descargando Artículo '+str(articulo))
    resp = requests.get(url=IMPO_ENDPOINT+LUC+str(articulo), params=params)

    data = json.loads(resp.text, strict=False)
    data['textoArticuloMarkdown'] = md(data['textoArticulo'])
    data['anteriorOriginal'] = getAnteriorOriginal(data.get('notasArticulo', None))
    
    json_file = open('LUC_articulo_'+str(articulo)+'.json', "w")
    json_file.write(json.dumps(data, indent=4))
    json_file.close()


# In[ ]:





# In[ ]:




