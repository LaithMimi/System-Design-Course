# You are provided with an array of integers, named 'nums'.
# Your task is to find all unique combinations of three numbers within this array that sum up to zero,
# with the condition that the indexes of these numbers must be distinct.
# Each combination should be returned as a list, with your final answer being a list of these lists.
# Ensure that there are no repeated combinations in your final answer, even if the same numbers occur more than once in the original array.

# Example 1:
# Input: nums = [-1,0,1,2,-1,-4]
# Output: [[-1,-1,2],[-1,0,1]]
# Explanation: There are two unique combinations that sum to zero, disregarding the order of numbers within the combinations.

# Example 2:
# Input: nums = [0,1,1]
# Output: []
# Explanation: There are no three numbers in this array that can sum to zero.

# Example 3:
# Input: nums = [0,0,0]
# Output: [[0,0,0]]
# Explanation: The only combination that sums to zero is three zeros.

# Constraints:
# The length of the array 'nums' is between 3 and 3000, inclusive.
# Each integer in 'nums' will be within the range from -10^5 to 10^5.

def three_sum(nums):
    nums.sort()
    result = []
    n = len(nums)

    for i in range(n - 2):
        # Skip duplicate first elements
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # No triplet possible if smallest remaining number is already positive
        if nums[i] > 0:
            break

        left, right = i + 1, n - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates for left and right
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1

    return result