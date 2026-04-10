import { FaStar } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import StarRow from "./StarRow";
import RatingDropdown from "./RatingDropdown";

import type { ReviewProps } from "../../types";

/* ─── Rating Dropdown (neo-brutalism style) ──────────────── */


const ReviewSection = ({handleSubmitReview, newRating, setNewRating, newComment, setNewComment, reviews, reviewUsers, submitLoading, submitError, submitSuccess}: ReviewProps) => {
  return (
    <>
      <div className="bg-col-four border-4 border-black shadow-[8px_8px_0px_#000] p-8 mb-0 border-b-0">
        <h3 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-3">
          Write a Review
        </h3>

        <form onSubmit={handleSubmitReview} className="flex flex-col gap-6">
          {/* Rating selector */}
          <div className="flex items-center gap-6">
            <label className="text-xl font-black uppercase w-28 shrink-0">Rating</label>
            <div className="flex items-center gap-4">
              <RatingDropdown value={newRating} onChange={setNewRating} />
              {newRating > 0 && (
                <StarRow rating={newRating} size={22} interactive onSelect={setNewRating} />
              )}
            </div>
          </div>

          {/* Comment textarea */}
          <div className="flex gap-6">
            <label className="text-xl font-black uppercase w-28 shrink-0 pt-3">Comment</label>
            <textarea
              id="review-comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts about this book…"
              maxLength={1000}
              rows={4}
              className="flex-1 bg-white border-4 border-black p-4 text-lg font-medium resize-none shadow-[4px_4px_0px_#000] focus:outline-none focus:shadow-none focus:translate-x-1 focus:translate-y-1 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Feedback messages */}
          {submitError && (
            <div className="bg-col-three text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-[3px_3px_0px_#000]">
              ⚠ {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="bg-col-five text-white border-4 border-black px-6 py-3 font-bold text-lg shadow-[3px_3px_0px_#000]">
              ✓ Review submitted successfully!
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end">
            <button
              id="submit-review-btn"
              type="submit"
              disabled={submitLoading}
              className="bg-black text-col-one border-4 border-black px-10 py-4 text-xl font-black uppercase shadow-[6px_6px_0px_rgba(255,197,103,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <IoMdSend size={22} />
              {submitLoading ? "Submitting…" : "Submit Review"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Review Cards ──────────────────────────────────── */}
      <div className="border-4 border-t-0 border-black shadow-[8px_8px_0px_#000] bg-white overflow-hidden">
        {reviews.length === 0 ? (
          <div className="p-10 text-center">
            <span className="text-3xl font-black text-gray-400 uppercase">
              No reviews yet — be the first!
            </span>
          </div>
        ) : (
          <div className="divide-y-4 divide-black">
            {reviews.map((review, idx) => (
              <div
                key={review.id}
                className={`flex gap-6 p-8 ${idx % 2 === 0 ? "bg-white" : "bg-[#FFFDE7]"}`}
              >
                {/* Avatar */}
                <div className="shrink-0 w-16 h-16 bg-col-two border-4 border-black flex items-center justify-center shadow-[3px_3px_0px_#000]">
                  <LuUser size={28} className="text-black" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <span className="text-xl font-black">
                      @{reviewUsers[review.user_id] ?? `User #${review.user_id}`}
                    </span>
                    <StarRow rating={review.rating} size={18} />
                    <span className="ml-auto text-sm font-bold text-gray-500 shrink-0">
                      {new Date(review.timestamp).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Rating badge */}
                  <div className="inline-flex items-center gap-1 bg-col-one border-2 border-black px-3 py-0.5 text-base font-black mb-3 shadow-[2px_2px_0px_#000]">
                    <FaStar size={12} className="text-yellow-600" />
                    {review.rating}/5
                  </div>

                  {review.comment && (
                    <p className="text-lg leading-relaxed font-medium text-gray-800">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewSection;
