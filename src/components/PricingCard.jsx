import { Check } from 'lucide-react';

export default function PricingCard({
    name = 'Plan',
    price = '99',
    description = 'Plan description',
    features = [],
    cta = 'Get Started',
    highlighted = false
}) {
    return (
        <div
            className={`relative rounded-2xl transition-all duration-300 ${highlighted
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl scale-105 md:scale-100'
                : 'bg-white shadow-lg hover:shadow-xl'
                }`}
        >
            {highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                </div>
            )}

            <div className={`p-8 ${highlighted ? 'text-white' : 'text-slate-900'}`}>
                {/* Header */}
                <h3 className={`text-2xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-slate-900'}`}>
                    {name}
                </h3>
                <p className={`text-sm mb-6 ${highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                    {description}
                </p>

                {/* Price */}
                <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                        <span className={`text-5xl font-bold ${highlighted ? 'text-white' : 'text-slate-900'}`}>
                            {price === 'Custom' ? price : `$${price}`}
                        </span>
                        {price !== 'Custom' && (
                            <span className={`text-sm ${highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                                /month
                            </span>
                        )}
                    </div>
                </div>

                {/* CTA Button */}
                <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 mb-8 ${highlighted
                        ? 'bg-white text-blue-600 hover:bg-blue-50 active:scale-95'
                        : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${highlighted ? 'focus-visible:ring-white' : 'focus-visible:ring-blue-600'
                        }`}
                >
                    {cta}
                </button>

                {/* Features */}
                <div className="space-y-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check
                                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${highlighted ? 'text-blue-100' : 'text-blue-600'
                                    }`}
                            />
                            <span
                                className={`text-sm ${highlighted ? 'text-blue-50' : 'text-slate-700'
                                    }`}
                            >
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
