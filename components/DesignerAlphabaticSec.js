/*eslint-disable*/
import { Button } from "@/components/ui/button";
import Link from "next/link";
function DesignerAlphabaticSec({ alphabat, designers, alphabatRef }) {
  const getMap = (ref) => {
    if (!ref.current) {
      ref.current = new Map();
    }
    return ref.current;
  };

  const getNode = (node, key, ref) => {
    const map = getMap(ref);
    if (!map.get(key)) {
      map.set(key, node);
    }
  };

  return (
    <section className="my-14">
      <h1
        className="text-2xl md:text-3xl font-bold my-4"
        ref={(node) => getNode(node, `${alphabat}`, alphabatRef)}
      >
        {alphabat}
      </h1>
      <div className="md:grid md:grid-cols-3 md:gap-4 text-xl md:text-2xl md:font-light space-y-1 flex flex-col">
        {designers.map((designer) => {
          return (
            <Button
              key={designer}
              variant="ghost"
              className="w-fit p-0 text-xl hover:bg-transparent active:bg-transparent focus-bg-transparent hover:underline cursor-pointer"
              asChild
            >
              <Link href={`/designers/${designer}`}>{designer}</Link>
            </Button>
          );
        })}
      </div>
    </section>
  );
}

export default DesignerAlphabaticSec;
