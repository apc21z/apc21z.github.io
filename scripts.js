const experienceData = [
  {
    empresa: 'LookWarming S.L.',
    puesto: 'Programador Web',
    fechas: '2021-2023',
    tecnologias: ['Spring Boot', 'Angular', 'MySQL', 'Java', 'HTML', 'CSS'],
    descripcion: 'Desarrollo del backend con Spring Boot, implementación de funcionalidades web con Angular y gestión de bases de datos en MySQL.',
    url: 'https://www.lookwarning.es/'
  },
  {
    empresa: 'Universidad Rey Juan Carlos',
    puesto: 'Becario de colaboración',
    fechas: '2023-2024',
    tecnologias: ['PHP', 'Oracle SQL', 'SQL', 'Spring Boot', 'APIs'],
    descripcion: 'Implantación y mantenimiento de aplicaciones y servicios, resolución de incidencias y trabajo con Oracle SQL y PHP.',
    url: ''
  }
];

const pageSize = 5;
let currentPage = 1;

function renderExperienceTable() {
  const tableBody = document.getElementById('experienceTableBody');
  const pagination = document.getElementById('experiencePagination');

  if (!tableBody || !pagination) {
    return;
  }

  const totalPages = Math.ceil(experienceData.length / pageSize);

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const currentItems = experienceData.slice(start, end);

  tableBody.innerHTML = currentItems
    .map(
      (item) => `
        <tr>
          <td>${item.empresa}</td>
          <td>${item.puesto}</td>
          <td>${item.fechas}</td>
          <td>
            <ul class="tech-list">
              ${item.tecnologias.map((tech) => `<li>${tech}</li>`).join('')}
            </ul>
          </td>
          <td>
            ${item.url && item.url.trim()
              ? `<a class="project-link" href="${item.url}" target="_blank" rel="noreferrer noopener" aria-label="Abrir proyecto de ${item.empresa}">↗</a>`
              : '<span class="project-link project-link--empty" aria-hidden="true">—</span>'}
          </td>
          <td>${item.descripcion}</td>
        </tr>
      `
    )
    .join('');

  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  const buttons = Array.from({ length: totalPages }, (_, index) => {
    const pageNumber = index + 1;
    const isActive = pageNumber === currentPage;
    return `
      <button
        type="button"
        class="page-button ${isActive ? 'active' : ''}"
        data-page="${pageNumber}"
        aria-label="Ir a la página ${pageNumber}"
      >
        ${pageNumber}
      </button>
    `;
  }).join('');

  pagination.innerHTML = buttons;

  pagination.querySelectorAll('.page-button').forEach((button) => {
    button.addEventListener('click', () => {
      currentPage = Number(button.dataset.page);
      renderExperienceTable();
    });
  });
}

document.addEventListener('DOMContentLoaded', renderExperienceTable);