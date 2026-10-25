// Time-of-day greeting in the visitor's own clock. Server renders a neutral
// "Hola." and a tiny inline script swaps it before first paint.
const script = `(function(){try{var h=new Date().getHours();var g=h<5?"Buenas noches.":h<12?"Buenos días.":h<19?"Buenas tardes.":"Buenas noches.";var el=document.getElementById("greet");if(el)el.textContent=g;}catch(e){}})();`;

export default function Greeting() {
  return (
    <>
      <p className="greet" id="greet" suppressHydrationWarning>Hola.</p>
      <script dangerouslySetInnerHTML={{ __html: script }} />
    </>
  );
}
