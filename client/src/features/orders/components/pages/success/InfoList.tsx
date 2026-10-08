const InfoList = () => {
  return (
    <div className="rounded-3xl bg-surface p-6 shadow-sm">
      <h2 className="mb-4 text-[1.1rem] font-semibold text-text-primary">
        Что дальше
      </h2>
      <div className="space-y-3">
        {[
          'Мы пришлём email когда статус изменится',
          'Следить за заказом можно в разделе «Мой аккаунт»',
          'Курьер свяжется с вами за 5 минут до доставки',
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-soft">
              <span className="text-xs font-bold text-primary">
                {index + 1}
              </span>
            </div>
            <p className="text-text-secondary">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoList;
