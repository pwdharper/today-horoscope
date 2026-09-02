import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오늘의 편지",
  description: "이름과 생년월일을 적으면 오늘 하루의 편지를 엽니다.",
};

const DIRECTION_CONTRACT = `<!--
THESIS: The surface is a morning daily brief you fill, then a letter printed on the same sheet. It refuses the night-sky zodiac template.
OWN-WORLD: Cool gray paper on a cooler desk, navy ink hairlines, one sunrise coral stamp for the only action. Pretendard. Sharp sheet, underline fields.
STORY: Visitor writes name and birth date, receives today's letter addressed to them, leaves with one line of advice.
FIRST VIEWPORT: Offset paper sheet on the desk, date in the header row, headline, then two underline fields and a coral stamp button. Primary action sits under the fields.
FORM: photocopied daily brief on a clipboard, ordered list index 3, seed 837ce0e6
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full font-sans">
        <div dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} className="hidden" />
        {children}
      </body>
    </html>
  );
}
