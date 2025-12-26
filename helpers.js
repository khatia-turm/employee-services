export function createRow(icon, label, value, isLink = false) {
  const content = isLink
    ? `<strong><a href="${value}">${value}</a></strong>`
    : `<p><strong>${value}</strong></p>`;
  return `
    <div class="details-section--row">
      <div class="flex--horizontal">
        <img src="../svgs/${icon}" class="details-section-icon" alt="${label} icon"/>
        <p>${label}:</p>
      </div>
      ${content}
    </div>
  `;
}

export function createVisaRows(visas) {
  if (!Array.isArray(visas) || visas.length === 0)
    return createRow("calendar-icon.svg", "Visa", "-");

  const now = Date.now();
  return visas
    .map((v, index) => {
      const start = new Date(v.start_date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const end = new Date(v.end_date).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      const expired = v.end_date < now ? " (expired)" : "";

      const visaRow = createRow(
        "visa-icon.svg",
        `Visa ${index + 1}`,
        `${v.issuing_country} - ${v.type}`
      );

      const dateRow = createRow(
        "calendar-icon.svg",
        `Visa ${index + 1} ${expired}`,
        `${start} / ${end}`
      );

      return visaRow + dateRow;
    })
    .join("");
}

export function switchPages(page) {
  window.location.href = page;
}

// refactoring displayDetailedUser to remove duplicate code
export function formatDateOfBirth(date) {
  const dat = new Date(date.year, date.month - 1, date.day);
  return dat.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
