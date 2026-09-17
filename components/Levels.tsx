import SectionHead from './SectionHead';
import { Block } from './Block';
import { levelObstacles, levelQuota, linePoints, SCORE_LEVEL_BONUS, CLEAN_BOARD_BONUS } from '@/lib/game';

const LEVELS = [1, 2, 3, 4, 5, 6, 8, 10, 11, 16];

export default function Levels() {
  return (
    <section id="levels" className="py-20 md:py-28 bg-shell border-y border-border/50 scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead kicker="Levels & scoring" title="Every level asks for a little more">
          <p>
            A level is a quota of pieces. Place them all and the next one starts on a clean
            board — with a few more pieces to place and a few more stones in the way.
          </p>
        </SectionHead>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="panel p-5 overflow-x-auto">
            <h3 className="font-label font-bold text-sm uppercase tracking-wider section-tick">Level ladder</h3>
            <table className="w-full mt-4 font-label text-sm">
              <thead>
                <tr className="text-dim text-xs text-left">
                  <th className="py-2 font-normal">LEVEL</th>
                  <th className="py-2 font-normal">PIECES</th>
                  <th className="py-2 font-normal">STONES</th>
                  <th className="py-2 font-normal text-right">BONUS</th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((l) => (
                  <tr key={l} className="border-t border-border/50">
                    <td className="py-2 text-accent">{l === 16 ? '16+' : l}</td>
                    <td className="py-2">{levelQuota(l)}</td>
                    <td className="py-2">
                      <span className="flex items-center gap-2">
                        <span className="flex gap-[2px]" aria-hidden="true">
                          {Array.from({ length: Math.ceil(levelObstacles(l) / 3) }, (_, i) => (
                            <Block key={i} color={8} className="gblock-sm w-2 h-2" />
                          ))}
                        </span>
                        {levelObstacles(l)}
                      </span>
                    </td>
                    <td className="py-2 text-right text-ok">+{SCORE_LEVEL_BONUS * l}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-dim mt-3 font-body">
              From level 16 on it holds at 40 pieces and 30 stones. Bigger shapes join the deal as you climb.
            </p>
          </div>

          <div className="panel p-5">
            <h3 className="font-label font-bold text-sm uppercase tracking-wider section-tick">Points</h3>
            <ul className="mt-4 space-y-3 font-label text-sm">
              <li className="flex justify-between border-b border-border/50 pb-3">
                <span>Each block placed</span><span className="text-accent">+1</span>
              </li>
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex justify-between border-b border-border/50 pb-3">
                  <span>{n} line{n > 1 ? 's' : ''} at once</span>
                  <span className="text-accent">+{linePoints(n, 0)}</span>
                </li>
              ))}
              <li className="flex justify-between border-b border-border/50 pb-3">
                <span>Streak</span><span className="text-blue-hi">×2, ×3, ×4…</span>
              </li>
              <li className="flex justify-between border-b border-border/50 pb-3">
                <span>Level cleared</span><span className="text-ok">+{SCORE_LEVEL_BONUS} × level</span>
              </li>
              <li className="flex justify-between">
                <span>Empty the whole board</span><span className="text-ok">+{CLEAN_BOARD_BONUS} × level</span>
              </li>
            </ul>
            <p className="text-xs text-dim mt-4 font-body">
              Example: a double clear on your third clear in a row scores {linePoints(2, 2)} points.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
