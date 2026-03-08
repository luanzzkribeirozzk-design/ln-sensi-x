# LN SENSI X

Aplicativo Android com overlay flutuante para auxiliar no Free Fire. Exibe um botão **TRICK** draggável por cima do jogo, com vibração ao clicar como auxílio de tiro.

---

## Funcionalidades

- Overlay flutuante roxo neon por cima do Free Fire
- Botão TRICK draggável (posicionável em qualquer lugar da tela)
- Vibração ao clicar (100ms — auxílio de tiro)
- Funciona com app minimizado em background
- Serviço em foreground com notificação persistente
- Design profissional com tema roxo neon (#9D4EDD)

---

## Como gerar o APK pelo GitHub Actions

### Método 1 — EAS Build (recomendado)

1. Crie uma conta em [expo.dev](https://expo.dev)
2. No painel da Expo, gere um **Access Token** em: `Account Settings > Access Tokens`
3. No seu repositório GitHub, vá em: `Settings > Secrets and variables > Actions`
4. Crie um secret chamado **`EXPO_TOKEN`** com o valor do token gerado
5. Faça push dos arquivos para a branch `main`
6. O workflow `build-apk.yml` será executado automaticamente
7. Ao finalizar, o APK estará disponível em:
   - **Actions > Build APK > Artifacts** (download direto)
   - **Releases** (versão publicada automaticamente)

### Método 2 — Gradle Local (sem conta Expo)

1. Vá em **Actions** no seu repositório GitHub
2. Selecione o workflow **"Build APK Local (Gradle)"**
3. Clique em **"Run workflow"**
4. Escolha o tipo: `debug` ou `release`
5. Aguarde o build (aprox. 10–15 minutos)
6. Baixe o APK em **Artifacts**

---

## Como enviar para o GitHub

```bash
# 1. Inicialize o repositório
git init
git add .
git commit -m "feat: LN SENSI X v1.0.4"

# 2. Crie um repositório no GitHub (github.com/new)
# 3. Conecte e envie
git remote add origin https://github.com/SEU_USUARIO/ln-sensi-x.git
git branch -M main
git push -u origin main
```

---

## Como instalar o APK no Android

1. Baixe o arquivo `ln-sensi-x.apk`
2. No Android: **Configurações > Segurança > Fontes desconhecidas** → Ativar
3. Abra o arquivo APK e instale
4. Ao abrir o app, conceda a permissão de **"Sobreposição sobre outros apps"**
5. Toque em **ATIVAR OVERLAY FLUTUANTE**
6. Minimize o app e abra o Free Fire
7. O botão TRICK aparecerá sobre o jogo

---

## Estrutura do Projeto

```
ln-sensi-x/
├── .github/
│   └── workflows/
│       ├── build-apk.yml          ← Build via EAS (automático no push)
│       └── build-apk-local.yml    ← Build via Gradle (manual)
├── app/
│   ├── _layout.tsx                ← Layout raiz
│   └── (tabs)/
│       ├── _layout.tsx            ← Navegação por abas
│       ├── index.tsx              ← Home Screen (ativar/desativar overlay)
│       └── settings.tsx           ← Configurações
├── android/
│   └── app/src/main/
│       ├── java/com/lnsensix/app/
│       │   ├── OverlayModule.kt           ← Módulo nativo React Native
│       │   ├── FloatingOverlayService.kt  ← Serviço de overlay (dentro de OverlayModule.kt)
│       │   ├── OverlayPackage.kt          ← Registro do módulo
│       │   ├── MainApplication.kt         ← Aplicação principal
│       │   └── MainActivity.kt            ← Activity principal
│       └── AndroidManifest.xml            ← Permissões e serviços
├── components/
│   ├── screen-container.tsx
│   └── ui/icon-symbol.tsx
├── constants/theme.ts
├── hooks/
│   ├── use-colors.ts
│   └── use-overlay-service.ts
├── app.config.ts
├── eas.json
├── package.json
├── tailwind.config.js
└── babel.config.js
```

---

## Tecnologias

| Tecnologia | Versão |
|---|---|
| Expo SDK | 54.0.29 |
| React Native | 0.81.5 |
| React | 19.1.0 |
| NativeWind | 4.2.1 |
| TypeScript | 5.9.3 |
| Kotlin | 2.1.20 |

---

## Permissões Android

| Permissão | Finalidade |
|---|---|
| `SYSTEM_ALERT_WINDOW` | Exibir overlay sobre outros apps |
| `FOREGROUND_SERVICE` | Manter serviço ativo em background |
| `POST_NOTIFICATIONS` | Notificação do serviço em foreground |
| `VIBRATE` | Vibração ao clicar no botão TRICK |

---

## Versão

**LN SENSI X v1.0.4** — Package: `com.lnsensix.app`
