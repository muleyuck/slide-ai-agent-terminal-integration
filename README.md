# AIエージェントと快適に開発するために、ターミナル環境を見直した話

2026-09-08 の LT（5分）で話すスライド。話し手は muleyuck。

公開先 <https://muleyuck.github.io/slide-ai-agent-terminal-integration/>

## 話すこと

AIエージェントを日常的に動かすようになって、ターミナルに求めるものが変わった。
その結果 **ghostty + herdr + neovim** に落ち着くまでの乗り換えの履歴と、
ツールを選ぶときに実際に効いた基準を5分で話す。

要求は2つある。1つはAI以前からのもので、プロジェクト単位に束ねて、一発で飛んで、
今どこにいるかが常に見えること。もう1つはAIが増やしたもので、動いているエージェントの
状況が一覧で見えること。

主張は1つ。環境の善し悪しを分けたのは「機能が揃っているか」ではなく、
**「既定のUIを、自分の書いたものに差し替えられるか」** だった。
「今どこにいるか」は多くのツールが標準で持っていて、差が出たのは *どこに出すか* を
自分で選べるかどうかだった。

## 構成

全9枚。ファイルは `src/slides/` に1枚1つ、並び順は `src/Presentation.tsx` が持つ。

| # | ファイル | 内容 |
|---|---|---|
| 1 | `TitleSlide` | 表紙 |
| 2 | `AboutMeSlide` | 自己紹介。足りないものを作っているうちに増えた自作ツール |
| 3 | `ConclusionSlide` | **結論を先に。** 今の構成と、それが満たすための2つの要求 |
| 4 | `Requirement1Slide` | 要求①（AI以前から）— 束ねる／一発で飛ぶ／今どこにいるかが見える |
| 5 | `HistorySlide` | 乗り換えの履歴。tmux → cmux → tmux → WezTerm → herdr と、毎回違う離脱理由 |
| 6 | `CurrentSetupSlide` | 要求①への答え。herdr のタブバーにシェルスクリプトで workspace 一覧を出す |
| 7 | `Requirement2Slide` | 要求②（AI以後）— 承認待ちのエージェントが画面外で止まっていることに気づけない |
| 8 | `AgentDashboardSlide` | 要求②への答え。`herdr agent list` を fzf に流す ⌘P のダッシュボード |
| 9 | `SummarySlide` | まとめ。効いた基準は最初から同じだった |

3枚目で結論を出してから、4〜6枚目で要求①、7〜8枚目で要求②を辿る形。

## 見る

```sh
mise install    # mise.toml の Node / pnpm を入れる
pnpm install
pnpm dev
```

矢印キーで進む。<kbd>O</kbd> でサムネイル一覧、<kbd>B</kbd> で一覧を横に置いた表示、
<kbd>P</kbd> で1ページ1枚の印刷、<kbd>Esc</kbd> で発表表示に戻る。
現在位置は URL の `#/present/{スライド}/{ステップ}` に出るので、途中から開ける。

## クレジット

スライドに出てくるロゴは各権利者に帰属する。

- ghostty — MIT, © Mitchell Hashimoto and Ghostty contributors
- [herdr](https://herdr.dev/) — © Herdr, Inc.
- Neovim logo by Jason Long — CC BY 3.0
