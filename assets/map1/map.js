(async function () {
  const svg = d3.select("#fv-map");
  const W = 900;
  const H = 750;
  
  const tooltip = document.getElementById("map-tooltip");
  const tooltipImg = document.getElementById("tooltip-img");
  const tooltipTitle = document.getElementById("tooltip-title");
  const tooltipDesc = document.getElementById("tooltip-desc");
  const tooltipLink = document.getElementById("tooltip-link");

  const geo = await d3.json("./poland.geojson");

  const projection = d3.geoMercator().fitSize([W, H], geo);
  const path = d3.geoPath(projection);

  svg.append("g")
    .attr("class", "fv-map__layer fv-map__layer--base")
    .selectAll("path")
    .data(geo.features)
    .join("path")
    .attr("class", "fv-map__shape")
    .attr("d", path);

  const points = [
    { name: "Szczecin", lat: 53.44292593546373, lon: 14.52252080458536, type: "city" },
    { name: "Gdańsk", lat: 54.351183379348775, lon: 18.644193249442324, type: "city" },
    { name: "Bydgoszcz", lat: 53.124448846860936, lon: 18.007175632679914, type: "city" },
    { name: "Poznań", lat: 52.40768641738534, lon: 16.946267922209753, type: "city" },
    { name: "Warszawa", lat: 52.231948433363804, lon: 21.00581940261985, type: "city" },
    { name: "Lublin", lat: 51.247763404463306, lon: 22.572206966580257, type: "city" },
    { name: "Wrocław", lat: 51.111142156073186, lon: 17.045391746118863, type: "city" },
    { name: "Kraków", lat: 50.060454128783924, lon: 19.94246947222055, type: "city" },
    { name: "Katowice", lat: 50.262158392222865, lon: 19.02247681258438, type: "city" },
    { name: "Rzeszów", lat: 50.041322, lon: 21.999015, type: "city" },
    { name: "Zakopane", lat: 49.29908157492179, lon: 19.94692916599894, type: "city" },
    { name: "Świnoujście", lat: 53.91058374206442, lon: 14.25977325664448, type: "city" }
  ];

  const spas = [
    { 
      name: "Kołobrzeg", 
      lat: 54.17422708877728, 
      lon: 15.579517175039504, 
      type: "spa",
      image: "/assets/img/destinations/kolobrzeg/kolobrzeg.webp",
      desc: "Nadmorski kurort znany z leczniczej solanki i pięknych plaż. Idealne miejsce na relaks nad Bałtykiem.",
      url: "../../destynacje.html#kolobrzeg"
    },
    { 
      name: "Świeradów-Zdrój", 
      lat: 50.908454600392474, 
      lon: 15.365400541478454, 
      type: "spa",
      image: "/assets/img/destinations/swieradow/swieradow.webp",
      desc: "Uzdrowisko w sercu Gór Izerskich. Słynie z radoczynnych wód termalnych i malowniczych szlaków.",
      url: "../../destynacje.html#swieradow"
    },
    { 
      name: "Polanica-Zdrój", 
      lat: 50.40727229656303, 
      lon: 16.499644606367028, 
      type: "spa",
      image: "../img/polanica.webp",
      desc: "Eleganckie uzdrowisko w Kotlinie Kłodzkiej. Znane z najnowocześniejszego w Polsce parku zdrojowego.",
      url: "../../destynacje.html#polanica"
    },
    { 
      name: "Nałęczów", 
      lat: 51.28879401913521, 
      lon: 22.211891167345613, 
      type: "spa",
      image: "/assets/img/destinations/naleczow/naleczow.webp",
      desc: "Uzdrowiskowy zakątek Lubelszczyzny. Miejsce, które inspiruje i regeneruje siły witalne.",
      url: "../../destynacje.html#naleczow"
    },
    { 
      name: "Busko-Zdrój", 
      lat: 50.477552966081376, 
      lon: 20.719320193788196, 
      type: "spa",
      image: "/assets/img/destinations/busko/busko.webp",
      desc: "Perła polskich uzdrowisk. Unikalne wody siarczkowe o wyjątkowych właściwościach leczniczych.",
      url: "../../destynacje.html#busko"
    },
    { 
      name: "Muszyna", 
      lat: 49.35689052346348, 
      lon: 20.896951692945088, 
      type: "spa",
      image: "/assets/img/destinations/muszyna/muszyna.webp",
      desc: "Uzdrowisko w Beskidzie Sądeckim. Słynie z naturalnych wód mineralnych i mikroklimatu.",
      url: "../../destynacje.html#muszyna"
    },
    { 
      name: "Polańczyk", 
      lat: 49.37323719691642, 
      lon: 22.41493530518585, 
      type: "spa",
      image: "/assets/img/destinations/polanica/polanica.webp",
      desc: "Nadjeziorny kurort nad Soliną. Doskonałe miejsce na wypoczynek i aktywność na świeżym powietrzu.",
      url: "../../destynacje.html#polanczyk"
    },
    { 
      name: "Wieliczka", 
      lat: 49.987061, 
      lon: 20.064796, 
      type: "spa",
      image: "/assets/img/destinations/wieliczka/wieliczka.webp",
      desc: "Historyczne miasto słynące z tężni solankowych i unikalnej kopalni soli na liście UNESCO.",
      url: "../../destynacje.html#wieliczka"
    }
  ];

  const allPoints = [...points, ...spas];

  const pts = allPoints.map(p => {
    const [x, y] = projection([p.lon, p.lat]);
    return { ...p, x, y };
  });

  const g = svg.append("g").attr("class", "fv-map__layer fv-map__layer--markers");

  g.selectAll("circle.city")
    .data(pts.filter(p => p.type === "city"))
    .join("circle")
    .attr("class", "city")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 3);

  g.selectAll("text.city")
    .data(pts.filter(p => p.type === "city"))
    .join("text")
    .attr("class", "city")
    .attr("x", d => d.x + 5)
    .attr("y", d => d.y + 3)
    .text(d => d.name);

  // ===== DEFINICJA SPA GROUPS =====
  const spaGroups = g.selectAll("g.spa-group")
    .data(pts.filter(p => p.type === "spa"))
    .join("g")
    .attr("class", "spa-group");

  spaGroups.append("circle")
    .attr("class", "spa-glow")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 12);

  spaGroups.append("circle")
    .attr("class", "spa-core")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 5);

  // ===== FUNKCJE POMOCNICZE =====
  
  // Sprawdź czy urządzenie jest dotykowe
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
  
  // Aktualnie otwarty tooltip (dla mobile)
  let activeTooltip = null;
  
  function showTooltip(event, d) {
    tooltipImg.src = d.image;
    tooltipImg.alt = d.name;
    tooltipTitle.textContent = d.name;
    tooltipDesc.textContent = d.desc;
    tooltipLink.style.display = "none";
    
    tooltip.classList.add("active");
    activeTooltip = d;
    
    positionTooltip(event, d);
  }
  
  function hideTooltip() {
    tooltip.classList.remove("active");
    activeTooltip = null;
  }
  
  function positionTooltip(event, d) {
    const tooltipRect = tooltip.getBoundingClientRect();
    const wrapperRect = document.querySelector('.fv-map-wrapper').getBoundingClientRect();
    
    // Dla touch events użyj changedTouches[0]
    let clientX, clientY;
    if (event.type.startsWith('touch')) {
      const touch = event.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    // Pozycja względem wrappera
    let left = clientX - wrapperRect.left + 15;
    let top = clientY - wrapperRect.top - tooltipRect.height / 2;
    
    // Sprawdź granice
    if (left + tooltipRect.width > wrapperRect.width) {
      left = clientX - wrapperRect.left - tooltipRect.width - 15;
    }
    
    if (top < 10) top = 10;
    if (top + tooltipRect.height > wrapperRect.height - 10) {
      top = wrapperRect.height - tooltipRect.height - 10;
    }
    
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }
  
  function scrollToDestination(d) {
    const destId = d.url.split('#')[1];
    const destElement = document.getElementById(destId);
    if (destElement) {
      destElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    hideTooltip();
  }

  // ===== EVENTY - DESKTOP + MOBILE =====
  
  if (isTouchDevice) {
    // ===== MOBILE/Touch Events =====
    
    spaGroups
      .on("touchstart", function(event, d) {
        event.preventDefault();
        event.stopPropagation();
        
        // Jeśli kliknięto tę samą perłę - przewiń do destynacji
        if (activeTooltip && activeTooltip.name === d.name) {
          scrollToDestination(d);
          return;
        }
        
        // Pokaż tooltip
        showTooltip(event, d);
        
        // Dodaj efekt wizualny kliknięcia
        d3.select(this).select(".spa-core")
          .transition().duration(150)
          .attr("r", 8)
          .attr("fill", "#E5C98B");
      })
      .on("touchend", function(event, d) {
        // Przywróć normalny wygląd
        d3.select(this).select(".spa-core")
          .transition().duration(300)
          .attr("r", 5)
          .attr("fill", "#E3E7EE");
      });
    
    // Ukryj tooltip po kliknięciu gdzie indziej na mapie
    svg.on("touchstart", function(event) {
      if (!event.target.closest('.spa-group')) {
        hideTooltip();
      }
    });
    
  } else {
    // ===== DESKTOP/Mouse Events =====
    
    spaGroups
      .on("mouseenter", function(event, d) {
        showTooltip(event, d);
      })
      .on("mousemove", function(event, d) {
        positionTooltip(event, d);
      })
      .on("mouseleave", function() {
        hideTooltip();
      })
      .on("click", function(event, d) {
        event.preventDefault();
        event.stopPropagation();
        scrollToDestination(d);
      });
  }
  
  // Zapobiegaj domyślnemu zoomowaniu na double-tap
  let lastTouchEnd = 0;
  document.querySelector('.fv-map-wrapper').addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

})();