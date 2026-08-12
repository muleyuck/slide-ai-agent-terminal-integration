# slide-sandbox

[flow-slide-engine](https://github.com/muleyuck/flow-slide-engine) を Vite + React +
TailwindCSS で動かすサンドボックス。スライドの中身はダミーで、構成そのものが成果物。

```sh
mise install    # mise.toml の Node / pnpm を入れる
pnpm install
pnpm dev
```

## 構成

| | |
|---|---|
| `index.html` | `html` / `body` / `#root` に `h-full`。デッキは入れ物の高さいっぱいに描くので、これがないと真っ白になる |
| `src/main.tsx` | エンジンの CSS → 自分の CSS の順で読み、`<Presentation>` をマウントする |
| `src/Presentation.tsx` | デッキ本体。**中身を書くのはここだけ** |
| `src/styles.css` | TailwindCSSの読み込みとテーマ。生の色はこのファイルだけに書く |
| `vendor/flow-slide-engine-0.3.0.tgz` | エンジンの実体。リポジトリにコミットする |

## 中身を書く

`src/Presentation.tsx` の `<Deck>` 直下に `<Slide>` を足していく。1 つの `<Slide>` が
1 枚。スタイルは CSS を書かず、Tailwind のユーティリティを `className` に並べる。

```tsx
<Slide>
  <Title className="font-bold text-accent-strong">見出し</Title>
  <ul className="list-disc pl-7 leading-loose marker:text-accent">
    <Step as="li">1 回目のキーで出る</Step>
    <Step as="li">2 回目のキーで出る</Step>
  </ul>
</Slide>
```

覚えておくことは 4 つ。

- **`<Step>` はスライドに直接渡したマークアップに書く。** 自作コンポーネントが返した
  `<Step>` はスライドから見えず、数に入らない。
- **`<Title>` には `font-bold` を付ける。** Tailwind の preflight が `h1` の
  `font-weight` を `inherit` にするので、付けないと細字になる。
- **色は必ずテーマのトークン経由で。** `text-accent` `bg-surface` `text-code` などを使い、
  `text-[#0d6efd]` のような直書きはしない。
- **余白と文字サイズは Tailwind の標準スケール（rem 固定）で。** `mb-6` `pl-7` `text-3xl`
  など。任意値 `mb-[1em]` は使わない。

段階表示・トランジション・モード・URL の仕様は
[エンジンの README](https://github.com/muleyuck/flow-slide-engine#readme) が持っている。

## テーマを変える

配色は `src/styles.css` の 1 か所で決まる。ここに 2 つの役割が並んでいる。

```css
@import "tailwindcss";

@theme {
  --color-accent: #0d6efd;   /* → Tailwind の text-accent / bg-accent / border-accent */
  ...
}

:root {
  --fs-progress-fill: var(--color-accent);  /* → エンジンが描く部分 */
  ...
}
```

`@theme` の値が Tailwind のユーティリティになり、`:root` の `--fs-*` がエンジン側
（スライド面、レターボックス、モードバー、プログレスバー、サムネイルの枠）を決める。
どちらも同じ役割名を参照しているので、色は 1 か所を直せば全体に効く。`--fs-*` の一覧は
エンジンの README の Theming にある。

## ゼロから別のリポジトリを作る場合

このリポジトリを作ったときの手順。

### 1. ツールチェーンを固定する

デッキは何年も後にビルドし直すことがあるので、Node と pnpm のバージョンをリポジトリに
書いておく。

```toml
# mise.toml
[tools]
node = "26.5.1"
pnpm = "11.20.0"
```

```sh
mise install
```

`package.json` の `packageManager` も同じ pnpm のバージョンに揃える（`pnpm add` などが
自動で書き込むが、mise 側を上げたときは手で合わせる）。

### 2. Vite プロジェクトを用意する

```sh
pnpm create vite@latest my-talk -- --template react-ts
cd my-talk
```

`src/App.tsx` `src/App.css` `src/index.css` `src/assets` はデッキには不要なので消す。

### 3. エンジンを vendor に入れる

エンジンはレジストリに公開されていない。リリースの tarball を落として、リポジトリに
コミットする。

```sh
mkdir -p vendor
gh release download v0.3.0 -R muleyuck/flow-slide-engine -p '*.tgz' -D vendor
pnpm add file:./vendor/flow-slide-engine-0.3.0.tgz
```

`vendor/` をコミットするのが要点で、これで install がレジストリにも private リポジトリにも
credential にも依存しなくなる。`react` と `react-dom` 19 は peer dependency。

### 4. TailwindCSS を入れる

```sh
pnpm add -D tailwindcss @tailwindcss/vite
```

`vite.config.ts` にプラグインを足す。v4 なので設定ファイルも `content` の指定もいらない。

```ts
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### 5. CSS を 1 枚書く

`src/styles.css` に `@import "tailwindcss"` と、`@theme` のトークン、`:root` の `--fs-*`
マッピングを書く（このリポジトリのものをそのまま持っていける）。CSS ファイルはこれ 1 枚
だけで、以降 CSS を書き足すことはない。

### 6. マウントする

`src/main.tsx` は **エンジンの CSS を先に** 読む。

```tsx
import "flow-slide-engine/style.css"
import "./styles.css"
```

`index.html` の `html` / `body` / `#root` に `h-full` を付ける。デッキに高さがないと、
エラーもなく真っ白なページになる。

### 7. 確認する

```sh
pnpm dev
pnpm typecheck
pnpm build
```
