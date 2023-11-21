import requests

def salvar_imagem(url, caminho_destino, nome_arquivo):
    nome_completo = caminho_destino + '/' + nome_arquivo.replace('/', '-')
    
    var = requests.get(url)
    with open(nome_completo, 'wb') as f:
        f.write(var.content)

    print("Imagem salva com sucesso!")

def leTxt(caminho):
        # Abre o arquivo em modo de leitura
    with open(caminho, 'r', encoding='utf-8') as file:
        # Lê as linhas do arquivo e remove espaços em branco
        urls = [line.split()[1].strip() for line in file.readlines()]

    # Imprime a lista de URLs
    print(urls)
    return urls

# salvar_imagem("https://v2.exercisedb.io/image/Ah0RUalwKDnJU6", "pyscripts\imgs", "teste.gif")

exs = leTxt("pyscripts/EXS.txt")
urls = leTxt("pyscripts/URLS.txt")

for i in range(len(urls)):
    salvar_imagem(urls[i], "pyscripts\imgs", str(exs[i]+'.gif'))