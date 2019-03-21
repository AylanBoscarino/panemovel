# Pane Móvel

  Pane Móvel é um app que encontra os postos de gasolinas mais próximos da sua localização geográfica e te exibe uma rota para o posto mais próximo.

  Nosso app permite selecionar outros postos e recalcula a rota para esse novo posto.

  Pane Móvel também exibe uma lista com os postos ordenados por proximidade e te permite selecionar o posto para onde deseja que uma rota seja traçada

![Mapa 1](https://lh3.googleusercontent.com/8bAC3UXppbttUk-PzzqufPNlSWl1SjZ-DzVGNoq4GE9YZUTrlDdIdPF_72hspniWaw=w1536-h754-rw) ![Mapa 2](https://lh3.googleusercontent.com/8bAC3UXppbttUk-PzzqufPNlSWl1SjZ-DzVGNoq4GE9YZUTrlDdIdPF_72hspniWaw=w1536-h754-rw) ![Lista](https://lh3.googleusercontent.com/FiibLwLi71OuIwrkh4ovytV9m6E-W97n0mhBOCxI03YLJydyK-IC_GAJK3cqXKfXpf-R=w1536-h754-rw)


## Overview

  Esse app foi construído em [React Native](http://facebook.github.io/react-native/),
  no momento apenas a versão para Android está disponível.

  Para rodar o projeto é preciso que você já tenha o Android Studio instalado e já configurado na sua 
  máquina, você pode seguir o [tutorial oficial](https://facebook.github.io/react-native/docs/getting-started) do React Native sobre como 
  fazer isso utilizando o **React Native CLI**.
  

  Você pode reproduzir este app na sua máquina clonando o repositório e instalando as dependências via **yarn**:

  ```console
  git clone https://github.com/AylanBoscarino/panemovel.git
  ```
  ```console
  cd panemovel
  ```
  ```console
  yarn install
  ```
  Em seguida é preciso que crie um arquivo (.env) com as configurações das variáveis de ambiente na raiz do projeto clonado onde você irá ter a sua chave de API do Google Maps e a assinatura do keystore:

  ```environment
  GOOGLE_MAPS_API_KEY=MINHA_CHAVE_DO_GOOGLE_MAS
  MYAPP_RELEASE_STORE_FILE=minha-chave.keystore
  MYAPP_RELEASE_KEY_ALIAS=alias-da-minha-chave
  MYAPP_RELEASE_STORE_PASSWORD=minhaSenha
  MYAPP_RELEASE_KEY_PASSWORD=minhaSenha
  ```
  Caso tenha dúvidas sobre como gerar uma chave assinada consulte a [documentação oficial](https://facebook.github.io/react-native/docs/signed-apk-android#docsNav).

  Com tudo configurado basta conectar seu dispositivo Android, seja em um aparelho físico ou um emulador, e rodar o seguinte comando:
  ```console
  react-native run-android
  ```