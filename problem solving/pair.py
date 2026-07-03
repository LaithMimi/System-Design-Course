# In a scenario where you're given a list of unique ID badges numbers 'nums' and a security checkpoint number 'target', your task is to find a pair of ID badges whose numbers sum up to the security checkpoint number.

# You should return the indices of these ID badges assuming no ID badge is scanned twice and there exists exactly one unique pair that meets the criteria.
# The order of indices in your result does not matter.

# Example 1:
# - Input: nums = [2, 7, 11, 15], target = 9
# - Output: [0, 1]

# Example 2:
# - Input: nums = [3, 2, 4], target = 6
# - Output: [1, 2]

# # Example 3:
# - Input: nums = [3,3], target = 6
# - Output: [0,1]

# # Constraints:
# - The length of the list 'nums' will be at least 2 and no more than 10^4
# - Each ID badge number will be an integer in the range from -10^9 to
# - The security checkpoint number 'target' will also be an integer within the same range
# - Assure only one valid pair exists that can be scanned to match the 'target' number

# Steps:

# Step 1: Initialize a Dictionary
# Inside the two_sum function, initialize an empty dictionary num_map. This dictionary will be used to store the numbers in nums as keys and their indices as values. This will help us quickly look up a number's index later in the code.
def two_sum(nums, target):
    num_map = {}
# Step 2: Iterate Through the List, Using a for loop, iterate through the nums list. Get both the index i and the value num for each iteration using the enumerate function.
    for i, num in enumerate(nums):
    # Step 3: Find the Complement
    # The complement is the number we need to find in nums to add up to target with num.
        complement = target - num

    # Step 4: Check if Complement Exists
    # Check if the complement exists as a key in the num_map dictionary. If it does, this means we've found two numbers that add up to the target.
    # The indices of these numbers are i (the current index) and num_map[complement] (the index stored in the dictionary).
        if complement in num_map:
        # Step 5: Return the Indices
        # If the complement exists in num_map, return the indices. However, the problem asks for the indices to be in ascending order, so sort the indices list [i, num_map[complement]] before returning.
            return sorted([num_map[complement], i])

    # Step 6: Store Number in Dictionary
    # If the complement does not exist in num_map, add the current number num and its index i as a key-value pair to the num_map dictionary. This way, we can look up the number later in the iterations.
        num_map[num] = i

# Step 7: No Solution
# If the function completes the loop without finding two numbers that add up to target, return None.
# This signifies that no solution was found. However, the problem assumes that there will always be a solution, so this case might not occur.
    return None