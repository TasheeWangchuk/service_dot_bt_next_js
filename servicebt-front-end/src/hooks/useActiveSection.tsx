import { useEffect, useState } from "react";
const useActiveSection = () => {
    const [activeSection, setActiveSection] = useState("overview");
  
    useEffect(() => {
      const handleScroll = () => {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;
  
        sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
          }
        });
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      const headerOffset = 80;
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };
  
    return { activeSection, scrollToSection };
  };
  
  export default useActiveSection;